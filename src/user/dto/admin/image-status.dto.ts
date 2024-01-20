import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PhotoTypeStatus } from 'src/shared/enum/photo-type-status.enum';

export class AdminImageStatusDto {
  @ApiProperty({
    required: true,
    default: '',
    enum: PhotoTypeStatus,
  })
  @IsEnum(PhotoTypeStatus)
  @IsNotEmpty()
  status: PhotoTypeStatus;
}
