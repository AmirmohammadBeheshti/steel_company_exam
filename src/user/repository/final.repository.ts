import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { FinalData } from '../schema/final-data.schema';

@Injectable()
export class FinalRepository extends BaseMongooseRepository<FinalData> {
  constructor(
    @InjectModel(FinalData.name) private readonly final: Model<FinalData>,
  ) {
    super(final);
  }
}
