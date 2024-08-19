import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'ZarinNameKarshenasi',
  timestamps: true,
})
export class ZarinNameKarshenasi extends Document {}

export const ZarinNameKarshenasiSchema =
  SchemaFactory.createForClass(ZarinNameKarshenasi);
