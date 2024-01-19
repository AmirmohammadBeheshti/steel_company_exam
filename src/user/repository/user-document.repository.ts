import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { UserDocument } from '../schema/user-document.schema';

@Injectable()
export class UserDocumentRepository extends BaseMongooseRepository<UserDocument> {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userDocModel: Model<UserDocument>,
  ) {
    super(userDocModel);
  }
}
