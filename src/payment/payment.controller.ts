import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly httpService: HttpService) {}
  @Post()
  async post(@Body() payload: any) {
    return await this.httpService
      .post('https://sep.shaparak.ir/OnlinePG/OnlinePG', payload)
      .toPromise();
  }
}
