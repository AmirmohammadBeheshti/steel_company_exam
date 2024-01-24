import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseRepository } from 'src/shared/enum/repository/base.repository';
import { Payment } from '../schema/payment.schema';

@Injectable()
export class PaymentRepository extends BaseMongooseRepository<Payment> {
  constructor(
    @InjectModel(Payment.name) private readonly userModel: Model<Payment>,
  ) {
    super(userModel);
  }
}
