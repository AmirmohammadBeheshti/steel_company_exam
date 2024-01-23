import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CompanyWorker } from 'src/shared/enum/company_worker.enum';
import { Degree } from 'src/shared/enum/degree.enum';
import { Gender } from 'src/shared/enum/gender.enum';
import { Job } from 'src/shared/enum/job.enum';
import { NativeRegionCondition } from 'src/shared/enum/native-region-condition.enum';
import { NativeRegion } from 'src/shared/enum/native-region.enum';
import { Sacrifice } from 'src/shared/enum/sacrifice.enum';
import { Sarbazi } from 'src/shared/enum/sarbazi.enum';

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
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  grade: number;

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
    enum: Sarbazi,
  })
  @IsEnum(Sarbazi)
  @IsNotEmpty()
  sarbazi: Sarbazi;

  @ApiProperty({
    required: true,
    enum: NativeRegionCondition,
  })
  @IsEnum(NativeRegionCondition)
  @IsOptional()
  NativeRegionCondition: NativeRegionCondition;

  @ApiProperty({
    required: true,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  workInCompanyYear: number;

  @ApiProperty({
    required: true,
    enum: CompanyWorker,
  })
  @IsOptional()
  @IsEnum(CompanyWorker)
  companyWorker: CompanyWorker;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  homeNumber: string;

  @ApiProperty({
    required: false,
    default: '',
  })
  @IsOptional()
  @IsString()
  companyName: string;

  @ApiProperty({
    required: false,
    default: '',
  })
  @IsOptional()
  @IsString()
  extraStudy: string;

  @ApiProperty({
    required: true,
    default: '',
    enum: Gender,
  })
  @IsEnum(Gender)
  @IsString()
  gender: Gender;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    required: true,
    enum: Job,
  })
  @IsEnum(Job)
  @IsNotEmpty()
  job: Job;

  @ApiProperty({
    required: true,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  // فارغ التحصیل
  graduated: boolean;

  @ApiProperty({
    required: true,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  hasInsuranceHistory: boolean;

  @ApiProperty({
    required: true,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  insuranceYear: number;

  @ApiProperty({
    required: true,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  hasMilitaryCard: boolean;
}
