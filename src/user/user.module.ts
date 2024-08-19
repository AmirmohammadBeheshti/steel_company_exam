import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserJwtSecretService } from './constant/user-jwt-secret.constant';
import { AuthController } from './controller/auth.controller';
import { UserAdminController } from './controller/user-admin.controller';
import { UserController } from './controller/user.controller';
import { ExamResultRepository } from './repository/exam-result.repository';
import { NationalRepository } from './repository/national.repository';
import { UserDocumentRepository } from './repository/user-document.repository';
import { UserRepository } from './repository/user.repository';
import { ExamResult, ExamResultSchema } from './schema/exam-result.schema';
import { National, NationalSchema } from './schema/national.schema';
import {
  UserDocument,
  UserDocumentSchema,
} from './schema/user-document.schema';
import { User, UserSchema } from './schema/user.schema';
import { UserAdminService } from './service/user-admin.service';
import { UserService } from './service/user.service';
import { UserJwtStrategy } from './strategies/user-jwt.strategy';
import { LocalUserStrategy } from './strategies/user-local.strategy';
import { FinalData, FinalDataSchema } from './schema/final-data.schema';
import { FinalRepository } from './repository/final.repository';
import {
  ZarinNameKarshenasi,
  ZarinNameKarshenasiSchema,
} from './schema/zarin-nam-karshenasi.schema';
import {
  ZarinNameoperator,
  ZarinNameOperatorSchema,
} from './schema/zarin-nam-operator.schema';
import { ZarinNamKarshenasiRepository } from './repository/zarinNamekarshenasi.repository';
import { ZarinNamOperatorRepository } from './repository/zarinNameOperator.repository';
import {
  nahaeiOperator,
  nahaeiOperatorSchema,
} from './schema/nahaei-operator.schema';
import {
  nahaeikarshenasi,
  nahaeikarshenasiSchema,
} from './schema/nahaei-karshenasi.schema';
import { NahaeiKarshenasiRepository } from './repository/nahaeiKarshenasi.repository';
import { NahaeiOperatorRepository } from './repository/nahaeiOperator.repository';

@Global()
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserDocument.name, schema: UserDocumentSchema },
      { name: National.name, schema: NationalSchema },
      { name: ExamResult.name, schema: ExamResultSchema },
      { name: FinalData.name, schema: FinalDataSchema },
      { name: ZarinNameKarshenasi.name, schema: ZarinNameKarshenasiSchema },
      { name: ZarinNameoperator.name, schema: ZarinNameOperatorSchema },
      { name: nahaeiOperator.name, schema: nahaeiOperatorSchema },
      { name: nahaeikarshenasi.name, schema: nahaeikarshenasiSchema },
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
    NationalRepository,
    ExamResultRepository,
    ZarinNamKarshenasiRepository,
    ZarinNamOperatorRepository,
    NahaeiKarshenasiRepository,
    NahaeiOperatorRepository,
    FinalRepository,
    UserAdminService,
    {
      provide: UserJwtSecretService,
      useExisting: JwtService,
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
