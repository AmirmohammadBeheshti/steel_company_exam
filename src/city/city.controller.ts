import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserJwtGuardFactory } from 'src/shared/guard/user-jwt.guard';
import { CityService } from './city.service';
import { CityWithProvinceDto } from './dto/city-with-province.dto';

@ApiBearerAuth()
@UseGuards(UserJwtGuardFactory())
@ApiTags('City & Province ')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('province')
  async getProvince() {
    return await this.cityService.findProvince();
  }

  @Get('city')
  async getCity() {
    return await this.cityService.findCity();
  }

  @Get('city-with-province')
  async getCityWithProvince(@Query() payload: CityWithProvinceDto) {
    return await this.cityService.getCityWithProvince(payload);
  }
}
