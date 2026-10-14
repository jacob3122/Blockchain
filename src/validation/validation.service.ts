import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Property, PropertyStatus } from '../properties/property.model';
import { User, UserRole, UserStatus } from '../users/models/user.model';
import { ValidatePropertyDto } from './dto/validate-property.dto';
import { PropertyValidation } from './property-validation.model';

@Injectable()
export class ValidationService {
  constructor(
    @InjectModel(Property) private readonly propertyModel: typeof Property,
    @InjectModel(PropertyValidation) private readonly validationModel: typeof PropertyValidation,
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly sequelize: Sequelize,
  ) {}

  async listPending(validatorId: string) {
    await this.getApprovedValidator(validatorId);
    return this.propertyModel.findAll({
      where: { status: PropertyStatus.SUBMITTED },
      order: [['submittedAt', 'ASC']],
    });
  }

  async validate(validatorId: string, propertyId: string, dto: ValidatePropertyDto) {
    await this.getApprovedValidator(validatorId);

    const property = await this.propertyModel.findByPk(propertyId);
    if (!property) throw new NotFoundException('Property not found');
    if (property.status !== PropertyStatus.SUBMITTED) {
      throw new BadRequestException(`Property is ${property.status}, not SUBMITTED`);
    }

    return this.sequelize.transaction(async (transaction) => {
      const validation = await this.validationModel.create(
        {
          propertyId,
          validatorId,
          decision: dto.status,
          reason: dto.status === PropertyStatus.VALIDATED ? null : dto.reason,
        },
        { transaction },
      );
      await property.update({ status: dto.status }, { transaction });
      return { property, validation };
    });
  }

  private async getApprovedValidator(validatorId: string) {
    const validator = await this.userModel.findByPk(validatorId);
    if (!validator || validator.status !== UserStatus.APPROVED || !validator.roles.includes(UserRole.VALIDATOR)) {
      throw new ForbiddenException('Only an approved validator can do this');
    }
    return validator;
  }
}
