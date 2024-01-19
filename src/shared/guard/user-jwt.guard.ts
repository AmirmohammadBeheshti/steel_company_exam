import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userJwtStrategy } from 'src/user/constant/user-jwt-strategy.constant';

@Injectable()
export class UserJwtGuard extends AuthGuard(userJwtStrategy) {}

export const UserJwtGuardFactory = (): Type<CanActivate> => {
  @Injectable()
  class UserGuardMixin extends UserJwtGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const req = context.switchToHttp().getRequest();

      return true;
    }
  }

  return UserGuardMixin;
};
