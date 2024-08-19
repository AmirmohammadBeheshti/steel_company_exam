import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'ZarinNameoperator',
  timestamps: true,
})
export class ZarinNameoperator extends Document {}

export const ZarinNameOperatorSchema =
  SchemaFactory.createForClass(ZarinNameoperator);
