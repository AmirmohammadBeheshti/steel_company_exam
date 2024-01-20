import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { DocStatus } from 'src/shared/enum/doc-status.enu,';

export class AdminDocStatusDto {
  @ApiProperty({
    required: true,
    default: '',
    enum: DocStatus,
  })
  @IsEnum(DocStatus)
  @IsNotEmpty()
  status: DocStatus;
}
