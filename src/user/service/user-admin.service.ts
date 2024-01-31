import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Types } from 'mongoose';
import { DocStatus } from 'src/shared/enum/doc-status.enu,';
import { UserStatus } from 'src/shared/enum/user-status.enum';
import { AddDescriptionDto } from '../dto/add-description.dto';
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
  async addDescription(userId: string, payload: AddDescriptionDto) {
    const found = await this.userRepo.findOne({ _id: userId });
    if (!found) throw new NotFoundException('کاربر مورد نظر یافت نشد');

    await this.userRepo.updateOne(
      { _id: userId },
      { description: payload.description },
    );
  }

  async delDescription(userId: string) {
    const found = await this.userRepo.findOne({ _id: userId });
    if (!found) throw new NotFoundException('کاربر مورد نظر یافت نشد');

    await this.userRepo.updateOne({ _id: userId }, { description: '' });
  }

  async getDescription(userId: string) {
    const found = await this.userRepo.findOne({ _id: userId });
    if (!found) throw new NotFoundException('کاربر مورد نظر یافت نشد');
    return found.description;
  }

  async getUser(payload: AdminFindUserDto) {
    const { status, page, nationalCode, phone, take, study, gender, job } =
      payload;
    return await this.userRepo.findAndPaginate(
      { take: Number(take), page: Number(page) },
      {
        isAdmin: false,
        status,
        gender,
        job,
        nationalCode: nationalCode && { $regex: nationalCode },
        phone: phone && { $regex: phone },
        extraStudy: study && { $regex: study },
      },
      null,
      {
        projection: {
          createdAt: 0,
          updatedAt: 0,
          password: 0,
          description: 0,
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

    // if (find.docStatus !== DocStatus.ACCEPTED) {
    //   throw new BadRequestException('لطفا اطلاعات ارسالی را تایید کنید');
    // }

    // const findUserDocument = await this.userDocRepo.find({
    //   userId: new Types.ObjectId(id),
    // });

    // findUserDocument.forEach((val) => {
    //   if (val.status !== PhotoTypeStatus.ACCEPTED) {
    //     throw new BadRequestException(
    //       'باید همه مدارک ارسالی کاربر تایید شده باشد ',
    //     );
    //   }
    // });

    await this.userRepo.updateOne({ _id: id }, { status: UserStatus.ACCEPTED });
  }
}
