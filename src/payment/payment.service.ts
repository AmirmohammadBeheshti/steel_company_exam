import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './reposiory/payment.repository';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepo: PaymentRepository) {}
  async verify(payload: any) {
    await this.paymentRepo.create(payload);
  }
}
