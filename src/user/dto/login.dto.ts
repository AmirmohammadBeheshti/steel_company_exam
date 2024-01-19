import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    default: '09150000000',
  })
  @IsMobilePhone('fa-IR')
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
