import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { PaymentStatus } from 'src/shared/enum/payment-status.enum';
import { generateRandomNumber } from 'src/shared/helper/random-number.helper';
import { StartPaymentDto } from './dto/start-payment.dto';
import { IPaymentRes } from './interface/payment-res.interface';
import { PaymentRepository } from './reposiory/payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepo: PaymentRepository,
    private readonly httpService: HttpService,
  ) {}
  async verify(payload: IPaymentRes) {
    try {
      const foundPayment = await this.paymentRepo.findOneAndUpdate(
        { token: payload.Token },
        { ...payload },
      );

      if (payload.Status === '2') {
        return {
          url: `https://ksc.bmtc.ac.ir/panel/finalRegistration/accept?id=${foundPayment._id}`,
        };
      }
      return {
        url: `https://ksc.bmtc.ac.ir/panel/finalRegistration/accept?id=${foundPayment._id}`,
      };
    } catch (e) {
      throw new BadRequestException(
        'در حال حاضر امکان برقراری با بانک امکان پذیر نیست',
      );
    }
  }

  async startPayment(payload: StartPaymentDto) {
    const amount = 10000;
    try {
      const a: any = await lastValueFrom(
        this.httpService.post('https://sep.shaparak.ir/OnlinePG/OnlinePG', {
          Action: 'Token',
          Amount: amount,
          Wage: 0,
          AffectiveAmount: 0,
          TerminalId: 419263,
          ResNum: generateRandomNumber(),
          RedirectURL: 'https://back2.ksc.bmtc.ac.ir/payment/verifyCallback',
        }),
      );

      await this.paymentRepo.create({
        userId: new Types.ObjectId(payload.userId),
        amount,
        token: a.data.token,
        status: PaymentStatus.STARTED,
      });

      return a.data.token;
    } catch (e) {
      throw new BadRequestException(
        'در حال حاضر امکان برقراری با بانک امکان پذیر نیست',
      );
    }
  }
}
