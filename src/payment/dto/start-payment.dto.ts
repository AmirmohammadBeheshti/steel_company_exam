import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class StartPaymentDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
