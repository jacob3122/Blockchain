import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Property } from '../properties/property.model';
import { User } from '../users/models/user.model';
import { PropertyValidation } from './property-validation.model';
import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

@Module({
  imports: [SequelizeModule.forFeature([PropertyValidation, Property, User])],
  controllers: [ValidationController],
  providers: [ValidationService],
})
export class ValidationModule {}
