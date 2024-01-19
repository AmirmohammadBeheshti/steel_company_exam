import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PhotoType } from 'src/shared/enum/photo-type.enum';

export class UploadImageDto {
  @ApiProperty({
    required: true,
    default: '',
    enum: PhotoType,
  })
  @IsEnum(PhotoType)
  @IsNotEmpty()
  type: PhotoType;
}
