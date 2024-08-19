import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { ZarinNameoperator } from '../schema/zarin-nam-operator.schema';
import { nahaeikarshenasi } from '../schema/nahaei-karshenasi.schema';

@Injectable()
export class NahaeiKarshenasiRepository extends BaseMongooseRepository<nahaeikarshenasi> {
  constructor(
    @InjectModel(nahaeikarshenasi.name)
    private readonly userModel: Model<nahaeikarshenasi>,
  ) {
    super(userModel);
  }
}
