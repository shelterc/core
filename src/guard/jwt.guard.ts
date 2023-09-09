import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ErrResult } from '@/common/result/result';

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
    // 返回 false的话会返回nest的默认对象，提示用户无权访问资源 https://docs.nestjs.com/guards#putting-it-all-together
    // return false
    // 调用父类的canActivate方法并返回，则会返回父类封装的数据对象
    // return super.canActivate(context);
    // 自定义异常
    throw new ErrResult(500, '没有权限');
  }
}
