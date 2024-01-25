import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { UpdateProfileDto } from '../update-profile.dto';

export class AdminUserUpdateDto extends UpdateProfileDto {
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
  phone: string;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
