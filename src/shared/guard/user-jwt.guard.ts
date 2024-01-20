import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Type,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userJwtStrategy } from 'src/user/constant/user-jwt-strategy.constant';

@Injectable()
export class UserJwtGuard extends AuthGuard(userJwtStrategy) {}

export const UserJwtGuardFactory = (
  isAdmin: boolean = false,
): Type<CanActivate> => {
  @Injectable()
  class UserGuardMixin extends UserJwtGuard {
    async canActivate(context: ExecutionContext) {
      console.log(isAdmin);
      await super.canActivate(context);
      const req = context.switchToHttp().getRequest();

      if (isAdmin && req?.user?.isAdmin !== true) {
        throw new ForbiddenException();
      }

      return true;
    }
  }

  return UserGuardMixin;
};
