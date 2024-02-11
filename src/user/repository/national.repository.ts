import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { National } from '../schema/national.schema';

@Injectable()
export class NationalRepository extends BaseMongooseRepository<National> {
  constructor(
    @InjectModel(National.name) private readonly nationalModel: Model<National>,
  ) {
    super(nationalModel);
  }
}
