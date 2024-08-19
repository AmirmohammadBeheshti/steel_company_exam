import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'nahaeikarshenasi',
  timestamps: true,
})
export class nahaeikarshenasi extends Document {}

export const nahaeikarshenasiSchema =
  SchemaFactory.createForClass(nahaeikarshenasi);
