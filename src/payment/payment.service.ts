import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { PaymentStatus } from 'src/shared/enum/payment-status.enum';
import { generateRandomNumber } from 'src/shared/helper/random-number.helper';
import { UserRepository } from 'src/user/repository/user.repository';
import { StartPaymentDto } from './dto/start-payment.dto';
import { IPaymentRes } from './interface/payment-res.interface';
import { PaymentRepository } from './reposiory/payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepo: PaymentRepository,
    private readonly userRepo: UserRepository,
    private readonly httpService: HttpService,
  ) {}
  async verify(payload: IPaymentRes) {
    const foundPayment = await this.paymentRepo.findOne({
      token: payload.Token,
    });
    if (!foundPayment) {
      throw new NotFoundException('تراکنش یافت نشد');
    }
    try {
      const foundPayment = await this.paymentRepo.findOneAndUpdate(
        { token: payload.Token },
        { ...payload },
      );
      if (payload.Status === '2') {
        try {
          const a = await lastValueFrom(
            this.httpService.post(
              `https://sep.shaparak.ir/verifyTxnRandomSessionkey/ipg/VerifyTranscation`,
              { RefNum: payload.RefNum, MID: payload.MID },
            ),
          );
          console.log('Accept', a);
          await this.paymentRepo.updateOne(
            { token: payload.Token },
            { status: PaymentStatus.COMPLETED, verifyLog: payload },
          );
          await this.userRepo.updateOne(
            { _id: foundPayment.userId },
            { isPaid: true },
          );
          return {
            url: `https://ksc.bmtc.ac.ir/panel/finalRegistration/accept?id=${foundPayment._id}`,
          };
        } catch (e) {
          console.log('RejectAccept', e);

          await this.paymentRepo.updateOne(
            { token: payload.Token },
            {
              status: PaymentStatus.FAILED_PROCESS,
              verifyLog: payload,
              axiosError: e,
            },
          );
          return {
            url: `https://ksc.bmtc.ac.ir/panel/finalRegistration/accept?id=${foundPayment._id}`,
          };
        }
      } else {
        try {
          const b = await this.paymentRepo.updateOne(
            { token: payload.Token },
            { status: PaymentStatus.FAILED, verifyLog: payload },
          );
          console.log('faild', b);

          return {
            url: `https://ksc.bmtc.ac.ir/panel/finalRegistration/accept?id=${foundPayment._id}`,
          };
        } catch (e) {
          console.log('faildB', e);

          await this.paymentRepo.updateOne(
            { token: payload.Token },
            {
              status: PaymentStatus.FAILED_PROCESS,
              verifyLog: payload,
              axiosError: e,
            },
          );
          return {
            url: `https://ksc.bmtc.ac.ir/panel/finalRegistration/accept?id=${foundPayment._id}`,
          };
        }
      }
    } catch (e) {
      await this.paymentRepo.updateOne(
        { token: payload.Token },
        {
          status: PaymentStatus.FAILED_PROCESS,
          verifyLog: payload,
          axiosError: e,
        },
      );
      return {
        url: `https://ksc.bmtc.ac.ir/panel/finalRegistration/accept?id=${foundPayment._id}`,
      };
    }
  }

  async paymentInfo(id: string) {
    return await this.paymentRepo.findOne(
      { _id: id },
      { verifyLog: -1, axiosError: -1, createdAt: -1, updatedAt: -1, __v: -1 },
    );
  }

  async startPayment(payload: StartPaymentDto) {
    const amount = 10000;
    try {
      const a: any = await lastValueFrom(
        this.httpService.post('https://sep.shaparak.ir/OnlinePG/OnlinePG', {
          action: 'token',
          Amount: amount,
          Wage: 0,
          AffectiveAmount: 0,
          TerminalId: '419263',
          ResNum: generateRandomNumber(99999).toString(),
          RedirectURL: 'https://back2.ksc.bmtc.ac.ir/payment/verifyCallback',
          SettlementIBANInfo: [
            {
              IBAN: 'IR220100004001020103006713',
              Amount: 10000,
              PurchaseID: '382100060127760000000000012008',
            },
          ],
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
      console.log(e);
      throw new BadRequestException(
        'در حال حاضر امکان برقراری با بانک امکان پذیر نیست',
      );
    }
  }
}
