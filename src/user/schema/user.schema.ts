import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Degree } from 'src/shared/enum/degree.enum';
import { Gender } from 'src/shared/enum/gender.enum';

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

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
