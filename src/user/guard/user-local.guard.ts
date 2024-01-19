import { AuthGuard } from '@nestjs/passport';
import { userLocalStrategy } from '../constant/user-local-strategy.constant';

export class UserLocalGuard extends AuthGuard(userLocalStrategy) {}
