import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserJwtGuardFactory } from 'src/shared/guard/user-jwt.guard';
import { GradeService } from './grade.service';

@ApiBearerAuth()
@UseGuards(UserJwtGuardFactory())
@ApiTags('grade ')
@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Get()
  async getProvince() {
    return await this.gradeService.findGrade();
  }
}
