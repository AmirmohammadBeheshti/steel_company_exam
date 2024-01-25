import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
}
