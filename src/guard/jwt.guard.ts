import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

//  与 class AuthGuard implements CanActivate 不同的是 ，@nestjs/passport 基于 CanActivate 二次拓展
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super(reflector);
  }

  // 作用：用于获取原始的 HTTP 请求对象。
  // 返回值：应返回原始的 HTTP 请求对象（Request 对象）。
  getRequest<T = any>(context: ExecutionContext): T {
    const request = context.switchToHttp().getRequest();
    return request;
  }

  // 作用：用于确定是否允许路由或资源的访问。
  // 返回值：应返回布尔值，指示是否允许访问路由或资源。
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAuth = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isAuth) return true;
    return super.canActivate(context);
  }
}
