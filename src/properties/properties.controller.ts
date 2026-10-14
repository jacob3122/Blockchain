import { Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PropertiesService } from './properties.service';

@ApiTags('Property onboarding')
@Controller('owner/:ownerId/properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Patch(':propertyId/submit')
  @ApiParam({ name: 'ownerId', example: 'a0000000-0000-4000-8000-000000000003' })
  @ApiParam({ name: 'propertyId', example: 'b0000000-0000-4000-8000-000000000001' })
  submit(
    @Param('ownerId', ParseUUIDPipe) ownerId: string,
    @Param('propertyId', ParseUUIDPipe) propertyId: string,
  ) {
    return this.propertiesService.submit(ownerId, propertyId);
  }
}
