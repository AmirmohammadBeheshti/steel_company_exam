import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FilterUserDto {
  @ApiProperty({
    required: false,
    default: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  take: number;

  @ApiProperty({
    required: false,
    default: 10,
  })
  @IsNumber()
  @Type(() => Number)

  @IsNotEmpty()
  page: number;
}
