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

  @Post('start')
  async start(@Body() payload: {}) {
    const driver = getPaymentDriver('saman') as any;
    const paymentInfo = await driver.requestPayment(payload);
    return paymentInfo;
  }
}
