import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (key: string, ctx: ExecutionContext): any => {
    const req = ctx.switchToHttp().getRequest();
    const customer = req.user;
    return key ? customer?.[key] : customer;
  },
);
