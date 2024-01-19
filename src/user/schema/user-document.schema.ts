import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PhotoTypeStatus } from 'src/shared/enum/photo-type-status.enum';
import { PhotoType } from 'src/shared/enum/photo-type.enum';

@Schema({
  collection: 'userDocument',
  validateBeforeSave: true,
  timestamps: true,
})
export class UserDocument extends Document {
  @Prop({ type: String })
  srcFile: string;

  @Prop({ type: String, enum: PhotoType })
  photoType: PhotoType;

  @Prop({
    type: String,
    default: PhotoTypeStatus.PENDING,
    enum: PhotoTypeStatus,
  })
  status: PhotoTypeStatus;

  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;
}

export const UserDocumentSchema = SchemaFactory.createForClass(UserDocument);
