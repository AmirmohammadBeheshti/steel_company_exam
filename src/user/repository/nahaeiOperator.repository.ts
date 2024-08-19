import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { nahaeiOperator } from '../schema/nahaei-operator.schema';

@Injectable()
export class NahaeiOperatorRepository extends BaseMongooseRepository<nahaeiOperator> {
  constructor(
    @InjectModel(nahaeiOperator.name)
    private readonly userModel: Model<nahaeiOperator>,
  ) {
    super(userModel);
  }
}
