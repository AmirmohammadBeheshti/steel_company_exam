import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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

  @Prop({ type: String })
  nationalCode: string;
  
  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  homeNumber: string;

  @Prop({ type: String , enum : Gender , default : Gender.MALE })
  gender: string;

  @Prop({ type: Date  })
  birthDate: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);
