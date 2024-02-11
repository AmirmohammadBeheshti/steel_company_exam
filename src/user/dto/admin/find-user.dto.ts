import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/shared/enum/gender.enum';
import { Job } from 'src/shared/enum/job.enum';
import { UserStatus } from 'src/shared/enum/user-status.enum';

export class AdminFindUserDto {
  @ApiProperty({
    required: false,
    default: '',
    enum: UserStatus,
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status: UserStatus;

  @ApiProperty({
    required: false,
    default: '',
    enum: Job,
  })
  @IsEnum(Job)
  @IsOptional()
  job: Job;

  @ApiProperty({
    required: false,
    default: '',
    enum: Gender,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @ApiProperty({
    required: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  study: string;

  @ApiProperty({
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ obj, key }) => obj[key] === 'true')
  isPaid: boolean;

  @ApiProperty({
    required: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  nationalCode: string;

  @ApiProperty({
    required: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    required: false,
    default: 10,
  })
  @IsString()
  @IsNotEmpty()
  take: string;

  @ApiProperty({
    required: false,
    default: 10,
  })
  @IsString()
  @IsNotEmpty()
  page: string;

  @ApiProperty({
    required: true,
    default: new Date(),
  })
  @IsDateString()
  @IsNotEmpty()
  startUpdatedAt: string;

  @ApiProperty({
    required: true,
    default: new Date(),
  })
  @IsDateString()
  @IsNotEmpty()
  endUpdatedAt: string;
}
