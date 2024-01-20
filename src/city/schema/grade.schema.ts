import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'grade',
  validateBeforeSave: true,
  timestamps: true,
})
export class Grade extends Document {
  @Prop({ type: String })
  degree: string;

  @Prop({ type: String })
  code: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);
