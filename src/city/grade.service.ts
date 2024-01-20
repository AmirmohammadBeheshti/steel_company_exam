import { Injectable } from '@nestjs/common';
import { GradeRepository } from './repository/grade.repository';

@Injectable()
export class GradeService {
  constructor(private readonly gradeRepo: GradeRepository) {}

  async findGrade() {
    const a = await this.gradeRepo.findAll();

    const b = a.map((val) => {
      return {
        code: val.name.trim(),
        name: val.code.trim(),
        degree: val.degree,
        description: val.description,
      };
    });
    return b;
  }
}
