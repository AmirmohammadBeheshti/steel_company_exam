import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { IKycFileInput } from 'src/shared/config/file-input';
import { multerOptions } from 'src/shared/config/multer.config';
import { UserJwtGuardFactory } from 'src/shared/guard/user-jwt.guard';
import { GetUser } from '../decorator/get-user.decorator';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UploadImageDto } from '../dto/upload-image.dto';
import { User } from '../schema/user.schema';
import { UserService } from '../service/user.service';

@UseGuards(UserJwtGuardFactory())
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@GetUser() userInfo: User) {
    return {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      nationalCode: userInfo.nationalCode,
      phone: userInfo.phone,
      homeNumber: userInfo.homeNumber,
      gender: userInfo.gender,
      birthDate: userInfo.birthDate,
      job: userInfo.job,
      degree: userInfo.degree,
      grade: userInfo.grade,
      sacrifice: userInfo.sacrifice,
      companyWorker: userInfo.companyWorker,
      nativeRegion: userInfo.nativeRegion,
      workInCompany: userInfo.workInCompany,
      gradePoint: userInfo.gradePoint,
      state: userInfo.state,
      cityId: userInfo.cityId,
      provinceId: userInfo.provinceId,
    };
  }

  @Put()
  async updateProfile(@Body() payload: UpdateProfileDto, @Request() req) {
    return this.userService.editProfile(payload, req.user);
  }

  @Post('documents')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'file', maxCount: 1 }], multerOptions),
  )
  @ApiConsumes('multipart/form-data')
  async uploadDocument(
    @Body() payload: UploadImageDto,
    @UploadedFiles()
    files: IKycFileInput,
    @Request() req,
  ): Promise<boolean> {
    return await this.userService.updateProfile(payload, files, req.user);
  }

  @Get('documents')
  async findUserDocument(@Request() req): Promise<any> {
    return await this.userService.findUserDocument(req.user);
  }
}
