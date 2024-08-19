import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'nahaeiOperator',
  timestamps: true,
})
export class nahaeiOperator extends Document {}

export const nahaeiOperatorSchema =
  SchemaFactory.createForClass(nahaeiOperator);
