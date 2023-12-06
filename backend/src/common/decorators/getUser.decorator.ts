import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    return context.switchToHttp().getRequest().user;
  },
);
