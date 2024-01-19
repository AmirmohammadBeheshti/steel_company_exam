import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { City } from '../schema/city.schema';

@Injectable()
export class CityRepository extends BaseMongooseRepository<City> {
  constructor(@InjectModel(City.name) private readonly cityModel: Model<City>) {
    super(cityModel);
  }
}
