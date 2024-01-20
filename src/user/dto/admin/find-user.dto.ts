import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatus } from 'src/shared/enum/user-status.enum';

export class AdminFindUserDto {
  @ApiProperty({
    required: true,
    default: '',
    enum: UserStatus,
  })
  @IsEnum(UserStatus)
  @IsNotEmpty()
  status: UserStatus;
}
