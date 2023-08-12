import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { LoggerService } from '../common/logger/logger.service';
import { errResult } from 'src/common/result/result';

@Injectable()
export class AuthGuard implements CanActivate {
  private Logger: LoggerService;
  constructor() {
    this.Logger = new LoggerService();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const { route, method } = request;
    this.Logger.error('进入拦截器', '');
    let a = true;
    if (a) {
      throw new errResult(HttpStatus.UNAUTHORIZED, '没有权限');
    } else {
      return true;
    }
  }

  private validateTokenMiddleware(): Promise<any> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
