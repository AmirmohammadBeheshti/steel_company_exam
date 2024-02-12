import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerOptions } from 'src/shared/config/multer.config';
import { UserStatus } from 'src/shared/enum/user-status.enum';
import { UserJwtGuardFactory } from 'src/shared/guard/user-jwt.guard';
import { ValidateMongoId } from 'src/shared/pipe/validation-mongo';
import { AddDescriptionDto } from '../dto/add-description.dto';
import { AdminUserUpdateDto } from '../dto/admin/admin-user-update.dto';
import { AdminDocStatusDto } from '../dto/admin/doc-status.dto';
import { AdminFindUserDto } from '../dto/admin/find-user.dto';
import { AdminImageStatusDto } from '../dto/admin/image-status.dto';
import { UserAdminService } from '../service/user-admin.service';

@ApiBearerAuth()
@UseGuards(UserJwtGuardFactory(true))
@ApiTags('User Admin')
@Controller('panel/user')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}
  @Get()
  getUser(@Query() payload: AdminFindUserDto) {
    return this.userAdminService.getUser(payload);
  }

  @Get('total')
  async total() {
    return await this.userAdminService.total();
  }

  @Post('update-user-info')
  async updateuser(@Body() payload: AdminUserUpdateDto) {
    return await this.userAdminService.updateUserInfo(payload);
  }

  @Patch('update-3-4-imgae/:national')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'file', maxCount: 1 }], multerOptions),
  )
  @ApiConsumes('multipart/form-data')
  async update3Image(
    @Param('national') national: string,
    @UploadedFiles()
    files: any,
  ) {
    return await this.userAdminService.update3Image(national, files.file);
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

  @Put('final-reject/:id')
  async finalReject(@Param('id', ValidateMongoId) id: string) {
    return this.userAdminService.finalAccept(id, UserStatus.REJECTED);
  }

  @Patch('description/:id')
  async description(
    @Param('id', ValidateMongoId) id: string,
    @Body() payload: AddDescriptionDto,
  ) {
    return await this.userAdminService.addDescription(id, payload);
  }

  @Delete('description/:id')
  async delDescription(@Param('id', ValidateMongoId) id: string) {
    return await this.userAdminService.delDescription(id);
  }

  @Get('description/:id')
  async getDescription(@Param('id', ValidateMongoId) id: string) {
    return await this.userAdminService.getDescription(id);
  }

  @Post('convert-data')
  async convertDat() {
    return false;
    // return await this.userAdminService.convertData();
  }

  @Post('convert-stu-number')
  async convertStuNumber() {
    return await this.userAdminService.convertStuNumber();
  }
}
