import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed (demo)')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('admin')
  @ApiOperation({ summary: 'Meera: admin, APPROVED' })
  seedAdmin() {
    return this.seedService.seedAdmin();
  }

  @Post('owner-investor')
  @ApiOperation({ summary: 'Anil: owner + investor, PENDING' })
  seedOwnerInvestor() {
    return this.seedService.seedOwnerInvestor();
  }

  @Post('owner')
  @ApiOperation({ summary: 'Ravi: owner, PENDING' })
  seedOwner() {
    return this.seedService.seedOwner();
  }

  @Post('investor')
  @ApiOperation({ summary: 'Anu: investor, PENDING' })
  seedInvestor() {
    return this.seedService.seedInvestor();
  }

  @Post('validator')
  @ApiOperation({ summary: 'Priya: validator, PENDING' })
  seedValidator() {
    return this.seedService.seedValidator();
  }

  @Post('green-villa')
  @ApiOperation({ summary: "Green Villa: Ravi's DRAFT (approve Ravi first)" })
  seedGreenVilla() {
    return this.seedService.seedGreenVilla();
  }
}
