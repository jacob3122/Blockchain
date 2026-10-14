import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole, UserStatus } from '../users/user.model';
import { Property, PropertyStatus } from './property.model';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property) private readonly propertyModel: typeof Property,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async createDraft(ownerId: string, data: Partial<Property>) {
    await this.getApprovedOwner(ownerId);
    return this.propertyModel.create({ ...data, ownerId, status: PropertyStatus.DRAFT });
  }

  async submit(ownerId: string, propertyId: string) {
    await this.getApprovedOwner(ownerId);

    const property = await this.propertyModel.findByPk(propertyId);
    if (!property || property.ownerId !== ownerId) throw new NotFoundException('Property not found');
    if (property.status !== PropertyStatus.DRAFT && property.status !== PropertyStatus.NEEDS_CHANGES) {
      throw new BadRequestException(`Property is already ${property.status}`);
    }

    return property.update({ status: PropertyStatus.SUBMITTED, submittedAt: new Date() });
  }

  private async getApprovedOwner(ownerId: string) {
    const owner = await this.userModel.findByPk(ownerId);
    if (!owner || owner.status !== UserStatus.APPROVED || !owner.roles.includes(UserRole.OWNER)) {
      throw new ForbiddenException('Only an approved owner can do this');
    }
    return owner;
  }
}
