import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'national',
  validateBeforeSave: true,
  timestamps: true,
})
export class National extends Document {
  @Prop({ type: String })
  phone: string;

  @Prop({ type: Number, default: 0 })
  stuNumber: number;
}

export const NationalSchema = SchemaFactory.createForClass(National);
