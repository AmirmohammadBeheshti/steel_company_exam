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
import { PhotoType } from 'src/shared/enum/photo-type.enum';
import { UserJwtGuardFactory } from 'src/shared/guard/user-jwt.guard';
import { GetUser } from '../decorator/get-user.decorator';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UploadImageDto } from '../dto/upload-image.dto';
import { User } from '../schema/user.schema';
import { UserAdminService } from '../service/user-admin.service';
import { UserService } from '../service/user.service';

@UseGuards(UserJwtGuardFactory())
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAdminService: UserAdminService,
  ) {}

  @Get('profile')
  getProfile(@GetUser() userInfo: User) {
    return {
      _id: userInfo._id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      nationalCode: userInfo.nationalCode,
      phone: userInfo.phone,
      homeNumber: userInfo.homeNumber,
      gender: userInfo.gender,
      birthDate: userInfo.birthDate,
      job: userInfo.job,
      degree: userInfo.degree,
      studyField: userInfo.degree,
      grade: userInfo.grade,
      sacrifice: userInfo.sacrifice,
      companyWorker: userInfo.companyWorker || '',
      nativeRegion: userInfo.nativeRegion || '',
      workInCompanyYear: userInfo.workInCompanyYear,
      gradePoint: userInfo.gradePoint,
      NativeRegionCondition: userInfo.NativeRegionCondition || '',
      companyName: userInfo.companyName || '',
      extraStudy: userInfo.extraStudy || '',
      graduated: userInfo.graduated,
      hasInsuranceHistory: userInfo.hasInsuranceHistory || false,
      insuranceYear: userInfo.insuranceYear || 0,
      hasMilitaryCard: userInfo.hasMilitaryCard || false,
      state: userInfo.state,
      status: userInfo.status,
      isPaid: userInfo.isPaid,
      docStatus: userInfo.docStatus,
      isAdmin: userInfo.isAdmin,
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

  @Post('documents-degree')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file1', maxCount: 1 },
        { name: 'file2', maxCount: 1 },
        { name: 'file3', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  @ApiConsumes('multipart/form-data')
  async uploadDegreeDocument(
    @Body() payload: UploadImageDto,
    @UploadedFiles()
    files: any,
    @Request() req,
  ): Promise<boolean> {
    console.log(files);
    if (files.file1) {
      await this.userService.updateProfile(
        { type: PhotoType.EDUCATION_DEGREE },
        { file: files.file1 },
        req.user,
      );
    }

    if (files.file2) {
      await this.userService.updateProfile(
        { type: PhotoType.EDUCATION_DEGREE2 },
        { file: files.file2 },
        req.user,
      );
    }

    if (files.file3) {
      await this.userService.updateProfile(
        { type: PhotoType.EDUCATION_DEGREE3 },
        { file: files.file3 },
        req.user,
      );
    }

    return true;
  }

  @Get('documents')
  async findUserDocument(@Request() req): Promise<any> {
    return await this.userService.findUserDocument(req.user);
  }

  @Get('description')
  async getDescription(@Request() req): Promise<any> {
    return await this.userAdminService.getDescription(req.user._id);
  }

  @Get('get-card')
  async getCard(@Request() req) {
    return await this.userService.generateCard(req.user);
  }
}
