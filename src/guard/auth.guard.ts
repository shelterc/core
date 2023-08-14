import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { LoggerService } from '../common/logger/logger.service';
import { errResult } from 'src/common/result/result';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  private reflector: Reflector;
  private Logger: LoggerService;
  constructor() {
    this.reflector = new Reflector();
    this.Logger = new LoggerService();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('isPublic', isPublic);
    this.Logger.error('进入拦截器', '');
    // if (isPublic) {
    //   return true;
    // }
    return true;
    // return super.canActivate(context);
    // const request = context.switchToHttp().getRequest();
    // const { authorization } = request.headers;
    // const { route, method } = request;
    // let a = true;
    // if (a) {
    //   throw new errResult(HttpStatus.UNAUTHORIZED, '没有权限');
    // } else {
    //   return true;
    // }
  }
}
