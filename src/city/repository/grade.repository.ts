import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { Grade } from '../schema/grade.schema';

@Injectable()
export class GradeRepository extends BaseMongooseRepository<Grade> {
  constructor(
    @InjectModel(Grade.name) private readonly cityModel: Model<Grade>,
  ) {
    super(cityModel);
  }
}
