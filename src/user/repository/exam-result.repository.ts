import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { ExamResult } from '../schema/exam-result.schema';

@Injectable()
export class ExamResultRepository extends BaseMongooseRepository<ExamResult> {
  constructor(
    @InjectModel(ExamResult.name)
    private readonly examResultModel: Model<ExamResult>,
  ) {
    super(examResultModel);
  }
}
