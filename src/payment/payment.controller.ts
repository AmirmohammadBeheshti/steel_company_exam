import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { StartPaymentDto } from './dto/start-payment.dto';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly httpService: HttpService,
    private readonly paymentService: PaymentService,
  ) {}

  @Post('bank/start')
  async post(@Body() payload: StartPaymentDto) {
    return await this.paymentService.startPayment(payload);
  }

  @Post('verify')
  async verify(@Body() payload: {} | any) {
    console.log('Ttttttttttt', payload);
    const a = await lastValueFrom(
      this.httpService.post(
        `https://sep.shaparak.ir/verifyTxnRandomSessionkey/ipg/VerifyTranscation`,
        payload,
      ),
    );

    console.log(a);
    return a.data;
  }

  @Post('start')
  async vaaaerify(@Body() payload: {} | any) {
    const a: any = await lastValueFrom(
      this.httpService.post(
        'https://sep.shaparak.ir/OnlinePG/OnlinePG',
        payload,
      ),
    );
    return a.data;
  }

  @Post('verifyCallback')
  @Redirect()
  async verify22(@Body() payload: any) {
    console.log('Bank Transaction ', payload);
    return await this.paymentService.verify(payload);
  }
}
