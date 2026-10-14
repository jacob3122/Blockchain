import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole, UserStatus } from './models/user.model'
import { UpdateUserStatusDto } from './dtos/approve-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

    async updateStatus(adminId: string, userId: string, dto: UpdateUserStatusDto) {
    const admin = await this.userModel.findByPk(adminId);
    if (!admin || admin.status !== UserStatus.APPROVED || !admin.roles.includes(UserRole.ADMIN)) {
      throw new ForbiddenException('Only an approved admin can do this');
    }

    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');
    if (user.status !== UserStatus.PENDING) {
      throw new BadRequestException(`User is already ${user.status}`);
    }

    const approved = dto.status === UserStatus.APPROVED;
    return user.update({
      status: dto.status,
      statusReason: approved ? null : dto.reason,
      approvedBy: approved ? admin.id : null,
      approvedAt: approved ? new Date() : null,
    });
  }
}