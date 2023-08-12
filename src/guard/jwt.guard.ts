import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

//  与 class AuthGuard implements CanActivate 不同的是 ，@nestjs/passport 基于 CanActivate 二次封装
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super(reflector);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAuth = this.reflector.getAllAndOverride<boolean>('isAuth', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isAuth) return true;
    return super.canActivate(context);
  }
}
