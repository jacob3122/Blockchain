import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertiesModule } from '../properties/properties.module';
import { Property } from '../properties/property.model';
import { User } from '../users/models/user.model'
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Property]), PropertiesModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
