import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { userJwtStrategy } from '../constant/user-jwt-strategy.constant';
import { User } from '../schema/user.schema';
import { UserService } from '../service/user.service';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(
  Strategy,
  userJwtStrategy,
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'UserExam',
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findOneOrFailed(payload.id);
    return user;
  }
}
