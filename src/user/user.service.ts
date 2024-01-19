import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  saltOrRounds: number;
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    this.saltOrRounds = 10;
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
        'قبلا با این کد ملی و یا شماره تلفن ثبت نام انجام شده است',
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
}
