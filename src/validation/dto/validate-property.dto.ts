import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { PropertyStatus } from '../../properties/property.model';

const DECISIONS = [PropertyStatus.VALIDATED, PropertyStatus.NEEDS_CHANGES, PropertyStatus.CLOSED];

export class ValidatePropertyDto {
  @ApiProperty({
    enum: DECISIONS,
    example: PropertyStatus.VALIDATED,
    description: 'VALIDATED = goes to valuation, NEEDS_CHANGES = back to owner, CLOSED = fake documents, closed for good',
  })
  @IsIn(DECISIONS)
  status: PropertyStatus;

  @ApiPropertyOptional({ description: 'Required unless VALIDATED', example: 'Tax receipt is unreadable, please re-upload' })
  @ValidateIf((dto: ValidatePropertyDto) => dto.status !== PropertyStatus.VALIDATED)
  @IsString()
  @IsNotEmpty()
  reason?: string;
}
