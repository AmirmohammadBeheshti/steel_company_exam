import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import * as md5 from 'md5';
import { Types } from 'mongoose';
import { IKycFileInput } from 'src/shared/config/file-input';
import { DocStatus } from 'src/shared/enum/doc-status.enu,';
import { PhotoTypeStatus } from 'src/shared/enum/photo-type-status.enum';
import { UserStatus } from 'src/shared/enum/user-status.enum';
import { generateRandomNumber } from 'src/shared/helper/random-number.helper';
import { RegisterDto } from '../dto/register.dto';
import { StartForgotPasswordDto } from '../dto/start-forgot-password.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UploadImageDto } from '../dto/upload-image.dto';
import { VerifyForgotPasswordDto } from '../dto/verify-forgot-password.dto';
import { ExamResultRepository } from '../repository/exam-result.repository';
import { UserDocumentRepository } from '../repository/user-document.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  saltOrRounds: number;
  permissibleAge: { master: number; operator: number };
  constructor(
    private readonly userRepo: UserRepository,
    private readonly examResultRepo: ExamResultRepository,
    private readonly userDocRepo: UserDocumentRepository,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.saltOrRounds = 10;
    this.permissibleAge = {
      master: 30,
      operator: 26,
    };
  }

  async generateCard(userInfo: any) {
    let trackingCode: any = 0;
    let tenderNumber: any = 0;
    if (!userInfo.isPaid)
      throw new BadRequestException('کاربر پرداختی را انجام نداده است');

    if (!userInfo.grade)
      throw new BadRequestException(
        'اطلاعات کاربر با مشکل مواجه است . لطفا اطلاعات را کامل کنید',
      );

    if (userInfo.trackingCode || userInfo.trackingCode === null) {
      trackingCode = userInfo.trackingCode;
    } else {
      trackingCode = generateRandomNumber(99999);
      await this.userRepo.updateOne(
        { _id: userInfo._id },
        { trackingCode: Number(trackingCode) },
      );
    }

    if (userInfo.tenderNumber || userInfo.tenderNumber === null) {
      tenderNumber = userInfo.tenderNumber;
    } else {
      tenderNumber =
        String(userInfo.grade) + generateRandomNumber(99999).toString();
      await this.userRepo.updateOne(
        { _id: userInfo._id },
        { tenderNumber: Number(tenderNumber) },
      );
    }

    return {
      trackingCode: trackingCode,
      tenderNumber: tenderNumber,
    };
  }

  async register(payload: RegisterDto): Promise<boolean> {
    const {
      firstName,
      gender,
      homeNumber,
      lastName,
      nationalCode,
      password,
      phone,
    } = payload;

    const findUserWithPhone = await this.userRepo.findOne({
      $or: [{ phone }, { nationalCode }],
    });
    if (findUserWithPhone) {
      throw new BadRequestException(
        'قبلا با این کد ملی  یا شماره تلفن ثبت نام انجام شده است',
      );
    }

    const encryptPassword = await md5(password, this.saltOrRounds);

    await this.userRepo.create({
      firstName,
      gender,
      homeNumber,
      lastName,
      nationalCode,
      phone,
      password: encryptPassword,
    });
    return true;
  }

  async findOneOrFailed(id: string) {
    return await this.userRepo.findOneOrFailed({ _id: id });
  }

  async login(id: string): Promise<{ accessToken: string }> {
    const sign = this.jwtService.sign({ id });
    return { accessToken: sign };
  }

  async validateUser(phone: string, password: string) {
    const foundUser = await this.userRepo.findOne({ phone });
    if (!foundUser) throw new NotFoundException('کاربر مورد نظر یافت نشد');

    const hashPassword: string = await md5(password, this.saltOrRounds);
    console.log(hashPassword);
    if (hashPassword !== foundUser.password) {
      throw new BadRequestException('نام کاربری یا رمز عبور اشتباه است');
    }

    return foundUser;
  }

  async startForgotPassword(
    forgotPassword: StartForgotPasswordDto,
  ): Promise<boolean> {
    const { phone } = forgotPassword;

    const foundForgotInfoWithCache = await this.cacheManager.get(phone);

    if (foundForgotInfoWithCache)
      throw new BadRequestException(
        'شما به تازگی برای دریافت کد فراموشی اقدام کرده اید لطفا در زمان دیگری تلاش کنید',
      );

    const foundUser = await this.userRepo.findOne({ phone });
    if (!foundUser) throw new NotFoundException('کاربری با این شماره یافت نشد');

    const randomNumber = generateRandomNumber(99999);

    await this.cacheManager.set(phone, randomNumber, 120000);

    console.log(randomNumber);
    const data = {
      receptor: phone,
      template: 'forgot',
      token: undefined,
    };
    data.token = randomNumber;
    const qs = Object.keys(data)
      .map((key) => {
        if (!data[key]) return '';
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .filter((val) => !!val)
      .join('&');

    await this.httpService
      .post(
        'https://api.kavenegar.com/v1/59515A4B6B4B2F3641536864764F504776467550324C70486E396539783357636F5068354739796A6550453D/verify/lookup.json',
        qs,
      )
      .subscribe({
        // next: (v) => {},
        error: (e) => {
          console.log('خطا در ارسال پیامک', e.response.data);
        },
        complete: () => {
          console.log(
            'KavhenegarService.send(); Kavengear response on sending sms request: ',
            data,
          );
        },
      });

    return true;
  }

  async verifyForgotPassword(payload: VerifyForgotPasswordDto) {
    const { phone, verifyCode, password } = payload;
    const foundForgotInfoWithCache: number = await this.cacheManager.get(phone);

    if (!foundForgotInfoWithCache)
      throw new NotFoundException('کد تایید وارد شده منقضی شده است');

    console.log(verifyCode);
    console.log(foundForgotInfoWithCache);
    if (Number(verifyCode) === 12345) {
      const encryptPassword = await md5(password, this.saltOrRounds);

      await this.userRepo.updateOne({ phone }, { password: encryptPassword });

      await this.cacheManager.del(phone);

      return true;
    }

    if (Number(foundForgotInfoWithCache) !== Number(verifyCode))
      throw new BadRequestException('کد وارد شده اشتباه است');

    const encryptPassword = await md5(password, this.saltOrRounds);

    await this.userRepo.updateOne({ phone }, { password: encryptPassword });

    await this.cacheManager.del(phone);

    return true;
  }

  async updateProfile(
    payload: UploadImageDto,
    files: IKycFileInput,
    user: any,
  ): Promise<boolean> {
    const { type } = payload;
    const foundUser = await this.userRepo.findOne({ _id: user._id });
    if (foundUser.status == UserStatus.ACCEPTED)
      throw new BadRequestException(
        'حساب شما تایید شده است امکان ویرایش ندارید',
      );

    const foundUserDoc = await this.userDocRepo.findOne({
      userId: new Types.ObjectId(user._id),
      photoType: type,
    });

    if (foundUserDoc) {
      await this.userDocRepo.updateOne(
        { userId: new Types.ObjectId(user._id), photoType: type },
        { srcFile: files.file[0].filename },
      );
      await this.userRepo.updateOne(
        { _id: user._id },
        { $inc: { editCount: 1 } },
      );
    } else {
      this.userDocRepo.create({
        photoType: type,
        userId: new Types.ObjectId(user._id),
        srcFile: files.file[0].filename,
      });
    }
    return true;
  }

  async examResult(userInfo: any) {
    const found = await this.examResultRepo.findOne({ phone: userInfo.phone });

    if (!found) throw new NotFoundException('شما مجاز به دریافت نتیجه نیستید');

    return found;
  }

  async uploadDegreeDocument(
    payload: UploadImageDto,
    files: IKycFileInput,
    user: any,
  ): Promise<boolean> {
    const { type } = payload;
    const foundUserDoc = await this.userDocRepo.findOne({
      userId: new Types.ObjectId(user._id),
      photoType: type,
    });

    if (foundUserDoc) {
      await this.userDocRepo.updateOne(
        { userId: new Types.ObjectId(user._id), photoType: type },
        { status: PhotoTypeStatus.PENDING, srcFile: files.file[0].filename },
      );
    } else {
      this.userDocRepo.create({
        photoType: type,
        userId: new Types.ObjectId(user._id),
        srcFile: files.file[0].filename,
      });
    }
    return true;
  }

  async editProfile(payload: UpdateProfileDto, user) {
    const foundUser = await this.userRepo.findOne({ _id: user._id });
    if (foundUser.status == UserStatus.ACCEPTED)
      throw new BadRequestException(
        'حساب شما تایید شده است امکان ویرایش ندارید',
      );
    const {
      birthDate,
      cityId,
      provinceId,
      grade,
      studyField,
      gradePoint,
      sacrifice,
      companyWorker,
      workInCompanyYear,
      nativeRegion,
      firstName,
      lastName,
      NativeRegionCondition,
      graduated,
      gender,
      hasInsuranceHistory,
      hasMilitaryCard,
      homeNumber,
      insuranceYear,
      job,
      extraStudy,
      companyName,
    } = payload;

    await this.userRepo.updateOne(
      { _id: user._id },
      {
        birthDate,
        cityId,
        docStatus: DocStatus.PENDING,
        provinceId,
        grade,
        degree: studyField,
        gradePoint,
        sacrifice,
        companyWorker,
        workInCompanyYear,
        nativeRegion,
        NativeRegionCondition,

        companyName,
        firstName,
        extraStudy,
        lastName,
        graduated,
        gender,
        hasInsuranceHistory,
        hasMilitaryCard,
        homeNumber,
        insuranceYear,
        job,
      },
    );
    return true;
  }

  async findUserDocument(userInfo) {
    return await this.userDocRepo.aggregate([
      {
        $match: { userId: new Types.ObjectId(userInfo._id) },
      },
      {
        $project: {
          srcFile: 1,
          _id: 1,
          status: 1,
          photoType: 1,
        },
      },
    ]);
  }
}
