import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Types } from 'mongoose';
import { DocStatus } from 'src/shared/enum/doc-status.enu,';
import { PhotoTypeStatus } from 'src/shared/enum/photo-type-status.enum';
import { UserStatus } from 'src/shared/enum/user-status.enum';
import { AdminUserUpdateDto } from '../dto/admin/admin-user-update.dto';
import { AdminDocStatusDto } from '../dto/admin/doc-status.dto';
import { AdminFindUserDto } from '../dto/admin/find-user.dto';
import { AdminImageStatusDto } from '../dto/admin/image-status.dto';
import { UserDocumentRepository } from '../repository/user-document.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserAdminService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userDocRepo: UserDocumentRepository,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getUser(payload: AdminFindUserDto) {
    const { status, page, nationalCode, phone, take } = payload;
    return await this.userRepo.findAndPaginate(
      { take: Number(take), page: Number(page) },
      {
        isAdmin: false,
        status,
        nationalCode: nationalCode && { $regex: nationalCode },
        phone: phone && { $regex: phone },
      },
      null,
      {
        projection: {
          createdAt: 0,
          updatedAt: 0,
          password: -1,

          __v: 0,
        },
      },
    );
  }

  async total() {
    return await this.userRepo.count({});
  }

  async updateUserInfo(payload: AdminUserUpdateDto) {
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
      userId,
      nationalCode,
      phone,
    } = payload;

    await this.userRepo.updateOne(
      { _id: userId },
      {
        birthDate,
        cityId,
        nationalCode,
        phone,
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

  async findById(id: string) {
    const findUser = await this.userRepo.find(
      { _id: id },
      { createdAt: 0, updatedAt: 0, isAdmin: 0 },
    );
    const findUserDocument = await this.userDocRepo.find(
      {
        userId: new Types.ObjectId(id),
      },
      { createdAt: 0, updatedAt: 0 },
    );
    return {
      findUser,
      findUserDocument,
    };
  }

  async acceptImage(id: string, payload: AdminImageStatusDto) {
    const { status } = payload;
    const find = await this.userDocRepo.findOne({ _id: id });
    if (!find) throw new NotFoundException('عکس یافت نشد');

    await this.userDocRepo.updateOne({ _id: id }, { status });

    return true;
  }

  async docStatus(id: string, payload: AdminDocStatusDto) {
    const { status } = payload;
    const find = await this.userRepo.findOne({ _id: id });
    if (!find) throw new NotFoundException('کاربر یافت نشد');

    await this.userRepo.updateOne({ _id: id }, { docStatus: status });

    return true;
  }

  async finalAccept(id: string) {
    const find = await this.userRepo.findOne({ _id: id });

    if (!find) throw new NotFoundException('کاربر یافت نشد');

    if (find.docStatus !== DocStatus.ACCEPTED) {
      throw new BadRequestException('لطفا اطلاعات ارسالی را تایید کنید');
    }
    const findUserDocument = await this.userDocRepo.find({
      userId: new Types.ObjectId(id),
    });

    findUserDocument.forEach((val) => {
      if (val.status !== PhotoTypeStatus.ACCEPTED) {
        throw new BadRequestException(
          'باید همه مدارک ارسالی کاربر تایید شده باشد ',
        );
      }
    });

    await this.userRepo.updateOne({ _id: id }, { status: UserStatus.ACCEPTED });
  }
}
