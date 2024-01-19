import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'city',
  validateBeforeSave: true,
  timestamps: true,
})
export class City extends Document {
  @Prop({ type: String })
  provinceId: string;

  @Prop({ type: String })
  provinceName: string;

  @Prop({ type: String })
  cityId: string;

  @Prop({ type: String })
  name: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
