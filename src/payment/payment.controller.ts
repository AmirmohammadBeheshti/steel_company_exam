import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getPaymentDriver } from 'monopay';
import { lastValueFrom } from 'rxjs';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly httpService: HttpService,
    private readonly paymentRepo: PaymentService,
  ) {}

  @Post()
  async post(@Body() payload: {}) {
    console.log('Ttttttttttt', payload);
    const a = await lastValueFrom(
      this.httpService.post(
        'https://sep.shaparak.ir/OnlinePG/OnlinePG',
        payload,
      ),
    );

    console.log(a);
    return a.data;
  }

  @Post('token')
  async token(@Body() payload: {} | any) {
    console.log('Ttttttttttt', payload);
    const a = await lastValueFrom(
      this.httpService.get(
        `https://sep.shaparak.ir/OnlinePG/SendToken?token=${payload.tokenValue}`,
      ),
    );

    console.log(a);
    return a.data;
  }

  @Post('verify')
  async verify(@Body() payload: {} | any) {
    console.log('Ttttttttttt', payload);
    const a = await lastValueFrom(
      this.httpService.get(
        `https://sep.shaparak.ir/verifyTxnRandomSessionkey/ipg/VerifyTranscation`,
        payload,
      ),
    );

    console.log(a);
    return a.data;
  }

  @Post('start')
  async start(@Body() payload: {}) {
    const driver = getPaymentDriver('saman') as any;
    const paymentInfo = await driver.requestPayment(payload);
    return paymentInfo;
  }

  @Post('verify222')
  verify22(@Body() payload: {}) {
    console.log(payload);
    this.paymentRepo.verify(payload);
  }
}
