import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Types } from 'mongoose';
import { IKycFileInput } from 'src/shared/config/file-input';
import { DocStatus } from 'src/shared/enum/doc-status.enu,';
import { PhotoType } from 'src/shared/enum/photo-type.enum';
import { UserStatus } from 'src/shared/enum/user-status.enum';
import { AddDescriptionDto } from '../dto/add-description.dto';
import { AdminUserUpdateDto } from '../dto/admin/admin-user-update.dto';
import { AdminDocStatusDto } from '../dto/admin/doc-status.dto';
import { AdminFindUserDto } from '../dto/admin/find-user.dto';
import { AdminImageStatusDto } from '../dto/admin/image-status.dto';
import { NationalRepository } from '../repository/national.repository';
import { UserDocumentRepository } from '../repository/user-document.repository';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';
import { FinalRepository } from '../repository/final.repository';
import { FilterUserDto } from '../dto/admin/filter-user.dto';
import { ZarinNamOperatorRepository } from '../repository/zarinNameOperator.repository';
import { ZarinNamKarshenasiRepository } from '../repository/zarinNamekarshenasi.repository';
import { NahaeiKarshenasiRepository } from '../repository/nahaeiKarshenasi.repository';
import { NahaeiOperatorRepository } from '../repository/nahaeiOperator.repository';

@Injectable()
export class UserAdminService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userDocRepo: UserDocumentRepository,
    private readonly nationalRepo: NationalRepository,
    private readonly finalRepo: FinalRepository,
    private readonly zarinNamKarshenasi: ZarinNamKarshenasiRepository,
    private readonly zarinNamoperator: ZarinNamOperatorRepository,
    private readonly finalKarshenasi: NahaeiKarshenasiRepository,
    private readonly finalOperator: NahaeiOperatorRepository,
    private readonly userService: UserService,
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
    const {
      status,
      page,
      nationalCode,
      phone,
      take,
      study,
      gender,
      job,
      endUpdatedAt,
      startUpdatedAt,
      isPaid,
    } = payload;
    console.log('ISPaid', isPaid);
    const foundData = await this.userRepo.findAndPaginate(
      { take: Number(take), page: Number(page) },
      {
        isAdmin: false,
        status,
        gender,
        job,
        updatedAt: {
          $gte: new Date(startUpdatedAt),
          $lt: new Date(endUpdatedAt),
        },
        nationalCode: nationalCode && { $regex: nationalCode },
        phone: phone && { $regex: phone },
        extraStudy: study && { $regex: study },
        isPaid,
      },
      null,
      {
        projection: {
          createdAt: 0,
          password: 0,
          editCount: 0,
          description: 0,
          __v: 0,
        },
        sort: {
          updatedAt: -1,
        },
      },
    );

    // if (printCard) {
    // console.log('Run Here ', foundData);
    // foundData.items.forEach(async (val, i) => {
    //   const findUser = foundData.items[i];
    //   const findData = await this.userService.generateCard(val);
    //   foundData.items[i].trackingCode = findData.trackingCode;
    //   foundData.items[i].tenderNumber = findData.tenderNumber;
    // });
    // }

    return foundData;
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

  async finalAccept(id: string, status = UserStatus.ACCEPTED) {
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

    await this.userRepo.updateOne({ _id: id }, { status });
  }

  async convertStuNumber() {
    const foundUser = await this.userRepo.findAll();
    for await (const a of foundUser) {
      const findNational = await this.nationalRepo.findOne({
        phone: a.phone,
      });
      if (!findNational)
        console.log('National Is Not Found ', a.phone, '=================');
      else {
        console.log('FOUND', a.nationalCode);
        this.userRepo.updateOne(
          { phone: a.phone },
          { studentNumber: findNational.stuNumber },
        );
        console.log('FINISH', a.nationalCode);
      }
    }
  }

  async convertData() {
    const foundUser = await this.userRepo.findAll();

    const gradeValues = {
      101: 1000,
      102: 2000,
      103: 3000,
      104: 4000,
      105: 5000,
      106: 6000,
      107: 7000,
      108: 8000,
      109: 9000,
      110: 10000,
      111: 11000,
      112: 12000,
      113: 13000,
      114: 14000,
      115: 15000,
      116: 16000,
      117: 17000,
      201: 18000,
      202: 19000,
      203: 20000,
      204: 21000,
      205: 22000,
      206: 23000,
      207: 24000,
    };

    for await (const user of foundUser) {
      const gradeValue = gradeValues[user.grade];
      if (!gradeValue) {
        console.log(user);
        continue;
      }

      // Increment the grade value by 1
      const updatedGradeValue = gradeValue + 1;

      // Prepare the update operation for MongoDB
      // Note: Adjust 'gradeValueField' to your actual field name in the MongoDB collection
      await this.userRepo.updateOne(
        { _id: user._id },
        { $set: { gradeValueField: updatedGradeValue } },
      );
      console.log(updatedGradeValue);
    }

    // Execute the bulkWrite operation if there are updates to make
    // console.dir(userUpdates, { depth: null });
  }

  async update3Image(national: string, files: IKycFileInput) {
    const foundUser = await this.userRepo.findOne({ nationalCode: national });
    if (!foundUser) throw new NotFoundException('کاربر یافت نشد');
    await this.userDocRepo.updateOne(
      {
        userId: new Types.ObjectId(foundUser._id),
        photoType: PhotoType.PHOTO3IN4,
      },
      { srcFile: files[0].filename },
    );
    return true;
  }

  async finalData(filter: FilterUserDto) {
    const { page, take } = filter;
    return await this.finalRepo.findAndPaginate(
      { page, take },
      {},
      // { createdAt: -1, updatedAt: -1 },
    );
  }

  async zarinNamKarshenasi11(payload: FilterUserDto) {
    return await this.zarinNamKarshenasi.findAndPaginate({
      page: payload.page,
      take: payload.take,
    });
  }

  async zarinNamOperator11(payload: FilterUserDto) {
    return await this.zarinNamoperator.findAndPaginate({
      page: payload.page,
      take: payload.take,
    });
  }

  async finalOperator111(payload: FilterUserDto) {
    return await this.finalOperator.findAndPaginate({
      page: payload.page,
      take: payload.take,
    });
  }

  async finalKarshenasi111(payload: FilterUserDto) {
    return await this.finalKarshenasi.findAndPaginate({
      page: payload.page,
      take: payload.take,
    });
  }
}
