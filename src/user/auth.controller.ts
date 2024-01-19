import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from './decorator/get-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { StartForgotPasswordDto } from './dto/start-forgot-password.dto';
import { VerifyForgotPasswordDto } from './dto/verify-forgot-password.dto';
import { UserLocalGuard } from './guard/user-local.guard';
import { UserService } from './user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() register: RegisterDto): Promise<boolean> {
    return this.userService.register(register);
  }

  @UseGuards(UserLocalGuard)
  @Post('login')
  async login(
    @GetUser() user: any,
    @Body() login: LoginDto,
  ): Promise<{ accessToken: string }> {
    return await this.userService.login(user._id);
  }

  @Put('forgot-password/start')
  async startForgotPassword(@Body() forgotPassword: StartForgotPasswordDto) {
    return this.userService.startForgotPassword(forgotPassword);
  }

  @Put('forgot-password/verify')
  async verifyForgotPassword(@Body() payload: VerifyForgotPasswordDto) {
    return this.userService.verifyForgotPassword(payload);
  }
}
