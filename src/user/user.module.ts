import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserJwtSecretService } from './constant/user-jwt-secret.constant';
import { AuthController } from './controller/auth.controller';
import { UserAdminController } from './controller/user-admin.controller';
import { UserController } from './controller/user.controller';
import { UserDocumentRepository } from './repository/user-document.repository';
import { UserRepository } from './repository/user.repository';
import {
  UserDocument,
  UserDocumentSchema,
} from './schema/user-document.schema';
import { User, UserSchema } from './schema/user.schema';
import { UserAdminService } from './service/user-admin.service';
import { UserService } from './service/user.service';
import { UserJwtStrategy } from './strategies/user-jwt.strategy';
import { LocalUserStrategy } from './strategies/user-local.strategy';

@Global()
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserDocument.name, schema: UserDocumentSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: 'UserExam',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController, AuthController, UserAdminController],
  providers: [
    UserService,
    UserRepository,
    UserDocumentRepository,
    LocalUserStrategy,
    UserJwtStrategy,
    UserAdminService,
    {
      provide: UserJwtSecretService,
      useExisting: JwtService,
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
