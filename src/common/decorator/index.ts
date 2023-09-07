import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

/**
 * @author: rain
 * @description: 当前用户信息
 * @return {*}
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

/**
 * @author: rain
 * @description: 用于区分是否鉴权路由
 * @return {*}
 */
export const IsAuth = () => SetMetadata('isAuth', true);
