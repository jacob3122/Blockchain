import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model'
import { UsersService } from './users.service';
import { UserApprovalController } from './user-approval.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserApprovalController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}