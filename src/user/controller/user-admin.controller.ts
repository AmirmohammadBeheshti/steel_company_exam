import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateMongoId } from 'src/shared/pipe/validation-mongo';
import { AdminDocStatusDto } from '../dto/admin/doc-status.dto';
import { AdminFindUserDto } from '../dto/admin/find-user.dto';
import { AdminImageStatusDto } from '../dto/admin/image-status.dto';
import { UserAdminService } from '../service/user-admin.service';

@ApiTags('User Admin')
@Controller('panel/user')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}
  @Get()
  getUser(@Query() payload: AdminFindUserDto) {
    return this.userAdminService.getUser(payload);
  }

  @Get(':id')
  async findById(@Param('id', ValidateMongoId) id: string) {
    return this.userAdminService.findById(id);
  }

  @Put('imageStatus/:id')
  async acceptImage(
    @Param('id', ValidateMongoId) id: string,
    @Body() payload: AdminImageStatusDto,
  ) {
    return this.userAdminService.acceptImage(id, payload);
  }

  @Put('DocumentStatus/:id')
  async docStatus(
    @Param('id', ValidateMongoId) id: string,
    @Body() payload: AdminDocStatusDto,
  ) {
    return this.userAdminService.docStatus(id, payload);
  }

  @Put('final-accept/:id')
  async finalAccept(@Param('id', ValidateMongoId) id: string) {
    return this.userAdminService.finalAccept(id);
  }
}
