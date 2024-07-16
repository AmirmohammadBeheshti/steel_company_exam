import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './city/city.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION, {
      ignoreUndefined: true,
    }),
    UserModule,
    CityModule,
    PaymentModule,
  ],
  providers: [],
})
export class AppModule {}
