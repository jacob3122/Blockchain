import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hash } from 'bcryptjs';
import { Property } from '../properties/property.model';
import { PropertiesService } from '../properties/properties.service';
import { User, UserRole, UserStatus } from '../users/models/user.model'

const DEMO_PASSWORD = 'Test@1234';
const RAVI_ID = 'a0000000-0000-4000-8000-000000000003';
const GREEN_VILLA_ID = 'b0000000-0000-4000-8000-000000000001';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Property) private readonly propertyModel: typeof Property,
    private readonly propertiesService: PropertiesService,
  ) {}

  seedAdmin() {
    return this.seed('a0000000-0000-4000-8000-000000000001', 'Meera', [UserRole.ADMIN], UserStatus.APPROVED);
  }

  seedOwnerInvestor() {
    return this.seed('a0000000-0000-4000-8000-000000000002', 'Anil', [UserRole.OWNER, UserRole.INVESTOR]);
  }

  seedOwner() {
    return this.seed(RAVI_ID, 'Ravi', [UserRole.OWNER]);
  }

  seedInvestor() {
    return this.seed('a0000000-0000-4000-8000-000000000004', 'Anu', [UserRole.INVESTOR]);
  }

  seedValidator() {
    return this.seed('a0000000-0000-4000-8000-000000000005', 'Priya', [UserRole.VALIDATOR]);
  }

  async seedGreenVilla() {
    const existing = await this.propertyModel.findByPk(GREEN_VILLA_ID);
    if (existing) return { created: false, property: existing };

    const property = await this.propertiesService.createDraft(RAVI_ID, {
      id: GREEN_VILLA_ID,
      name: 'Green Villa',
      propertyType: 'VILLA',
      address: 'Plot 12, Green Meadows',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      areaSqft: 2400,
      description: '4BHK villa with a garden',
    });
    return { created: true, property };
  }

  private async seed(id: string, name: string, roles: UserRole[], status = UserStatus.PENDING) {
    const [user, created] = await this.userModel.findOrCreate({
      where: { id },
      defaults: {
        id,
        name,
        email: `${name.toLowerCase()}@test.com`,
        passwordHash: await hash(DEMO_PASSWORD, 10),
        roles,
        status,
        approvedAt: status === UserStatus.APPROVED ? new Date() : null,
      },
    });

    return {
      created,
      user: { id: user.id, name: user.name, email: user.email, roles: user.roles, status: user.status },
    };
  }
}
