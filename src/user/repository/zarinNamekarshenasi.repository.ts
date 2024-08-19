import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { User } from '../schema/user.schema';
import { ZarinNameKarshenasi } from '../schema/zarin-nam-karshenasi.schema';

@Injectable()
export class ZarinNamKarshenasiRepository extends BaseMongooseRepository<ZarinNameKarshenasi> {
  constructor(
    @InjectModel(ZarinNameKarshenasi.name)
    private readonly userModel: Model<ZarinNameKarshenasi>,
  ) {
    super(userModel);
  }
}
