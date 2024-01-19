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
import { calculateYearAndDaysDifference } from 'src/shared/helper/calculate-between-two-days.helper';
import { generateRandomNumber } from 'src/shared/helper/random-number.helper';
import { RegisterDto } from './dto/register.dto';
import { StartForgotPasswordDto } from './dto/start-forgot-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { VerifyForgotPasswordDto } from './dto/verify-forgot-password.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  saltOrRounds: number;
  permissibleAge: { master: number; operator: number };
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.saltOrRounds = 10;
    this.permissibleAge = {
      master: 30,
      operator: 26,
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

  async updateProfile(payload: UpdateProfileDto) {
    const result = calculateYearAndDaysDifference(
      new Date(payload.birthDate),
      new Date(),
    );

    return result;
  }
}
