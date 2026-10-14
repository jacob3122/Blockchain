import { Body, Controller, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ValidatePropertyDto } from './dto/validate-property.dto';
import { ValidationService } from './validation.service';

const PRIYA_ID = 'a0000000-0000-4000-8000-000000000005';
const GREEN_VILLA_ID = 'b0000000-0000-4000-8000-000000000001';

@ApiTags('Property validation')
@Controller('validator/:validatorId/properties')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Get('pending')
  @ApiParam({ name: 'validatorId', example: PRIYA_ID })
  listPending(@Param('validatorId', ParseUUIDPipe) validatorId: string) {
    return this.validationService.listPending(validatorId);
  }

  @Patch(':propertyId/status')
  @ApiParam({ name: 'validatorId', example: PRIYA_ID })
  @ApiParam({ name: 'propertyId', example: GREEN_VILLA_ID })
  validate(
    @Param('validatorId', ParseUUIDPipe) validatorId: string,
    @Param('propertyId', ParseUUIDPipe) propertyId: string,
    @Body() dto: ValidatePropertyDto,
  ) {
    return this.validationService.validate(validatorId, propertyId, dto);
  }
}
