import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityRepository } from './repository/city.repository';
import { ProvinceRepository } from './repository/province.repository';
import { City, CitySchema } from './schema/city.schema';
import { Province, ProvinceSchema } from './schema/province.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Province.name, schema: ProvinceSchema },
      { name: City.name, schema: CitySchema },
    ]),
  ],
  controllers: [CityController],
  providers: [CityService, ProvinceRepository, CityRepository],
})
export class CityModule {}
