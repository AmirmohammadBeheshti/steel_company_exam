import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from 'src/shared/enum/gender.enum';

export class RegisterDto {
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
    default: '09150000000',
  })
  @IsMobilePhone('fa-IR')
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  nationalCode: string;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  homeNumber: string;

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
  password: string;
}
