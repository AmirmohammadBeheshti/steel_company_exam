import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { Province } from '../schema/province.schema';

@Injectable()
export class ProvinceRepository extends BaseMongooseRepository<Province> {
  constructor(
    @InjectModel(Province.name) private readonly provinceModel: Model<Province>,
  ) {
    super(provinceModel);
  }
}
