import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'finalData',
  timestamps: true,
})
export class FinalData extends Document {
  @Prop({ type: String })
  firstName: string;

  createdAt: Date;
  updatedAt: Date;
}

export const FinalDataSchema = SchemaFactory.createForClass(FinalData);
