import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'payment',
  validateBeforeSave: true,
  timestamps: true,
})
export class Payment extends Document {
  @Prop({ type: Number })
  amount: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
