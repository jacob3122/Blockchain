import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserStatusDto } from './dtos/approve-user.dto'
import { UsersService } from './users.service';

@ApiTags('User approval')
@Controller('admin/:adminId/users')
export class UserApprovalController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':userId/status')
  @ApiParam({ name: 'adminId', example: 'a0000000-0000-4000-8000-000000000001' })
  @ApiParam({ name: 'userId', example: 'a0000000-0000-4000-8000-000000000002' })
  updateStatus(
    @Param('adminId', ParseUUIDPipe) adminId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: UpdateUserStatusDto,
  ) {
    return this.usersService.updateStatus(adminId, userId, dto);
  }
}