import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'province',
  validateBeforeSave: true,
  timestamps: true,
})
export class Province extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  provinceId: string;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
