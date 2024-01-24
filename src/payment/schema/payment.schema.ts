import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentStatus } from 'src/shared/enum/payment-status.enum';

@Schema({
  collection: 'payment',
  validateBeforeSave: true,
  timestamps: true,
})
export class Payment extends Document {
  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: String })
  token: string;

  @Prop({ type: String })
  MID: string;

  @Prop({ type: String })
  TerminalId: string;

  @Prop({ type: String })
  RefNum: string;

  @Prop({ type: String })
  ResNum: string;

  @Prop({ type: String })
  State: string;

  @Prop({ type: String })
  TraceNo: string;

  @Prop({ type: String })
  Wage: string;

  @Prop({ type: String })
  Rrn: string;

  @Prop({ type: String })
  SecurePan: string;

  @Prop({ type: String })
  Status: string;

  @Prop({ type: String })
  Token: string;

  @Prop({ type: String })
  HashedCardNumber: string;

  @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.STARTED })
  status: PaymentStatus;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
