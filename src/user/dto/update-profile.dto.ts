import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { CompanyWorker } from 'src/shared/enum/company_worker.enum';
import { Degree } from 'src/shared/enum/degree.enum';
import { Grade } from 'src/shared/enum/grade.enum';
import { NativeRegion } from 'src/shared/enum/native-region.enum';
import { Sacrifice } from 'src/shared/enum/sacrifice.enum';

export class UpdateProfileDto {
  @ApiProperty({
    required: true,
    default: new Date(),
  })
  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  provinceId: string;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  cityId: string;

  @ApiProperty({
    required: true,
    default: '',
    enum: Grade,
  })
  @IsEnum(Grade)
  @IsNotEmpty()
  grade: Grade;

  @ApiProperty({
    required: true,
    default: '',
    enum: Degree,
  })
  @IsEnum(Degree)
  @IsNotEmpty()
  studyField: Degree;

  @ApiProperty({
    required: true,
    default: '18.36',
  })
  @IsString()
  @IsNotEmpty()
  gradePoint: string;

  @ApiProperty({
    required: true,
    default: '18.36',
  })
  @IsString()
  @IsNotEmpty()
  sacrifice: Sacrifice;

  @ApiProperty({
    required: true,
    enum: NativeRegion,
  })
  @IsEnum(NativeRegion)
  @IsNotEmpty()
  nativeRegion: NativeRegion;

  @ApiProperty({
    required: true,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  workInCompany: boolean;

  @ApiProperty({
    required: true,
    enum: CompanyWorker,
  })
  @IsNotEmpty()
  @IsEnum(CompanyWorker)
  companyWorker: CompanyWorker;
}
