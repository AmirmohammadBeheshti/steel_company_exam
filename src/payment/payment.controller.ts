import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getPaymentDriver } from 'monopay';
import { lastValueFrom } from 'rxjs';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly httpService: HttpService) {}

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
}
