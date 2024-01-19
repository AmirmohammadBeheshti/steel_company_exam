import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CompanyWorker } from 'src/shared/enum/company_worker.enum';
import { Degree } from 'src/shared/enum/degree.enum';
import { Gender } from 'src/shared/enum/gender.enum';
import { Grade } from 'src/shared/enum/grade.enum';
import { NativeRegion } from 'src/shared/enum/native-region.enum';
import { Sacrifice } from 'src/shared/enum/sacrifice.enum';

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

  @Prop({ type: String, enum: Gender, default: Gender.MALE })
  gender: string;

  @Prop({ type: Date })
  birthDate: Date;

  @Prop({ type: String })
  job: string;

  @Prop({ type: String, enum: Degree, default: Degree.BACHELORS })
  degree: string;

  @Prop({ type: String, enum: Grade, default: Grade.Num101 })
  grade: string;

  @Prop({ type: String, enum: Grade, default: Grade.Num101 })
  sacrifice: string;

  @Prop({ type: String, enum: CompanyWorker, default: CompanyWorker.TREATY })
  companyWorker: string;

  @Prop({ type: String, enum: NativeRegion, default: NativeRegion.NON_NATIVE })
  nativeRegion: string;

  @Prop({ type: Boolean, default: false })
  workInCompany: boolean;

  @Prop({ type: String, enum: Sacrifice })
  gradePoint: string;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  cityId: string;

  @Prop({ type: String })
  provinceId: string;

  @Prop({ type: String })
  password: string;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
