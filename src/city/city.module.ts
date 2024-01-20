import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { GradeController } from './grade.controller';
import { CityRepository } from './repository/city.repository';
import { GradeRepository } from './repository/grade.repository';
import { ProvinceRepository } from './repository/province.repository';
import { City, CitySchema } from './schema/city.schema';
import { Grade, GradeSchema } from './schema/grade.schema';
import { Province, ProvinceSchema } from './schema/province.schema';
import { GradeService } from './grade.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Province.name, schema: ProvinceSchema },
      { name: City.name, schema: CitySchema },
      { name: Grade.name, schema: GradeSchema },
    ]),
  ],
  controllers: [CityController, GradeController],
  providers: [
    CityService,
    ProvinceRepository,
    GradeService,
    CityRepository,
    GradeRepository,
  ],
})
export class CityModule {}
