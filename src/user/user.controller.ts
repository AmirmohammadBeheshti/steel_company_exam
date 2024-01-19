import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserJwtGuardFactory } from 'src/shared/guard/user-jwt.guard';
import { GetUser } from './decorator/get-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@UseGuards(UserJwtGuardFactory())
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@GetUser() userInfo: User) {
    return userInfo;
  }

  @Put()
  async updateProfile(@Body() payload: UpdateProfileDto) {
    return this.userService.updateProfile(payload);
  }
}
