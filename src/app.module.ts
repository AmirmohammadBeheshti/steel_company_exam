import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath : ['.env']
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    UserModule],

})
export class AppModule {}
