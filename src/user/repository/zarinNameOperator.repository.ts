import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { ZarinNameoperator } from '../schema/zarin-nam-operator.schema';

@Injectable()
export class ZarinNamOperatorRepository extends BaseMongooseRepository<ZarinNameoperator> {
  constructor(
    @InjectModel(ZarinNameoperator.name)
    private readonly userModel: Model<ZarinNameoperator>,
  ) {
    super(userModel);
  }
}
