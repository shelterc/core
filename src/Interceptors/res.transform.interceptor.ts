/*
 * @Author:
 * @Date: 2021-12-31 10:10:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-09 10:57:50
 * @Description: 响应拦截器
 * @FilePath: \core\src\Interceptors\res.transform.interceptor.ts
 */

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
