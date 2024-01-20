import { Injectable } from '@nestjs/common';
import { CityWithProvinceDto } from './dto/city-with-province.dto';
import { CityRepository } from './repository/city.repository';
import { ProvinceRepository } from './repository/province.repository';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepo: CityRepository,
    private readonly provinceRepo: ProvinceRepository,
  ) {}

  async findCity() {
    return await this.cityRepo.findAll();
  }

  async findProvince() {
    return await this.provinceRepo.findAll();
  }

  async getCityWithProvince(payload: CityWithProvinceDto) {
    return await this.cityRepo.find({ provinceId: payload.provinceId });
  }
}
