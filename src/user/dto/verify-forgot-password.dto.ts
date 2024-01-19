import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class VerifyForgotPasswordDto {
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
    default: '58698',
  })
  @IsString()
  @IsNotEmpty()
  verifyCode: string;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
