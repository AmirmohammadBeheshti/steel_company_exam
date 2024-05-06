import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FilterUserDto {
  @ApiProperty({
    required: false,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  take: number;

  @ApiProperty({
    required: false,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  page: number;
}
