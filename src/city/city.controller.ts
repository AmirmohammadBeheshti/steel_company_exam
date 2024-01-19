import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserJwtGuardFactory } from 'src/shared/guard/user-jwt.guard';
import { CityService } from './city.service';

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
}
