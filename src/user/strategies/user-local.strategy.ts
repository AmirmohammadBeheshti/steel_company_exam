import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { userLocalStrategy } from '../constant/user-local-strategy.constant';
import { User } from '../schema/user.schema';
import { UserService } from '../user.service';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(
  Strategy,
  userLocalStrategy,
) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(mobileNumber: string, password: string): Promise<User> {
    console.log('Valdae', password);
    const user = await this.userService.validateUser(mobileNumber, password);

    return user;
  }
}
