import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { UserStatus } from '../models/user.model'

export class UpdateUserStatusDto {
  @ApiProperty({ enum: [UserStatus.APPROVED, UserStatus.REJECTED], example: UserStatus.APPROVED })
  @IsIn([UserStatus.APPROVED, UserStatus.REJECTED])
 declare status: UserStatus.APPROVED | UserStatus.REJECTED;

  @ApiPropertyOptional({ description: 'Required when REJECTED', example: 'Details could not be verified' })
  @ValidateIf((dto: UpdateUserStatusDto) => dto.status === UserStatus.REJECTED)
  @IsString()
  @IsNotEmpty()
  reason?: string;
}