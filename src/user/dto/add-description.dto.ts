import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddDescriptionDto {
  @ApiProperty({
    required: true,
    default: 'Describe',
  })
  @IsNotEmpty()
  @IsString()
  description: Date;
}
