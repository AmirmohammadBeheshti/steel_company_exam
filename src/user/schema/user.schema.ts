import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CompanyWorker } from 'src/shared/enum/company_worker.enum';
import { Degree } from 'src/shared/enum/degree.enum';
import { DocStatus } from 'src/shared/enum/doc-status.enu,';
import { Gender } from 'src/shared/enum/gender.enum';
import { Grade } from 'src/shared/enum/grade.enum';
import { Job } from 'src/shared/enum/job.enum';
import { NativeRegionCondition } from 'src/shared/enum/native-region-condition.enum';
import { NativeRegion } from 'src/shared/enum/native-region.enum';
import { Sacrifice } from 'src/shared/enum/sacrifice.enum';
import { Sarbazi } from 'src/shared/enum/sarbazi.enum';
import { UserStatus } from 'src/shared/enum/user-status.enum';

@Schema({
  collection: 'user',
  validateBeforeSave: true,
  timestamps: true,
})
export class User extends Document {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, unique: true })
  nationalCode: string;

  @Prop({ type: String, unique: true })
  phone: string;

  @Prop({ type: String })
  homeNumber: string;

  @Prop({ type: String })
  companyName: string;

  @Prop({ type: String })
  extraStudy: string;

  @Prop({ type: String })
  tenderNumber: string;

  @Prop({ type: String })
  trackingCode: string;

  @Prop({ type: String, enum: Gender, default: Gender.MALE })
  gender: string;

  @Prop({ type: Date })
  birthDate: Date;

  @Prop({ type: String, enum: Job })
  job: Job;

  @Prop({ type: String, enum: Degree })
  degree: string;

  @Prop({ type: String, enum: Grade })
  grade: string;

  @Prop({ type: String, enum: Sacrifice })
  sacrifice: Sacrifice;

  @Prop({ type: String, enum: CompanyWorker })
  companyWorker: string;

  @Prop({ type: String, enum: NativeRegion })
  nativeRegion: NativeRegion;

  @Prop({ type: Boolean, enum: Sarbazi })
  sarbazi: Sarbazi;

  @Prop({ type: String, enum: NativeRegionCondition })
  NativeRegionCondition: string;

  @Prop({ type: Number })
  workInCompanyYear: number;

  @Prop({ type: String, enum: Sacrifice })
  gradePoint: string;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @Prop({ type: String, enum: DocStatus, default: DocStatus.WAITING })
  docStatus: DocStatus;

  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: Boolean, default: false })
  graduated: boolean;

  @Prop({ type: Boolean })
  hasInsuranceHistory: boolean;

  @Prop({ type: String, enum: Sarbazi })
  hasMilitaryCard: Sarbazi;

  @Prop({ type: Number })
  insuranceYear: number;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  cityId: string;

  @Prop({ type: String })
  provinceId: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, default: 0 })
  editCount: number;

  @Prop({ type: Number, default: 0 })
  seatNumber: number;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
