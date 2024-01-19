import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { UserJwtSecretService } from './constant/user-jwt-secret.constant';
import { UserRepository } from './repository/user.repository';
import { User, UserSchema } from './schema/user.schema';
import { UserJwtStrategy } from './strategies/user-jwt.strategy';
import { LocalUserStrategy } from './strategies/user-local.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: 'UserExam',
        signOptions: { expiresIn: '20d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    UserRepository,
    LocalUserStrategy,
    UserJwtStrategy,
    {
      provide: UserJwtSecretService,
      useExisting: JwtService,
    },
  ],
})
export class UserModule {}
