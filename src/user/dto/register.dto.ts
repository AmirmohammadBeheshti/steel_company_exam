import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
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
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+98|0)?9\d{9}$/, {
    message: 'شماره وارد شده اشتباه است',
  })
  phone: string;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{10}$/, {
    message: 'کد ملی وارد شده اشتباه است',
  })
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
