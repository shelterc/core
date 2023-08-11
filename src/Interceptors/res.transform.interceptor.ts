import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class resTransformInterceptor implements NestInterceptor {
  // 拦截器
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { path } = request;
    return next.handle().pipe(
      map((data) => {
        if (path == '/wx/configVerification') {
          return data;
        } else {
          return {
            data,
            code: 200,
            msg: 'success',
          };
        }
      }),
    );
  }
}
