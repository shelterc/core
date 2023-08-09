import {
  HttpException,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../common/log4js';

// @Catch 注解传入参数，如当前为只捕获HttpException的异常，其他类型的异常此类不进行处理
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly Logger: LoggerService;
  constructor() {
    this.Logger = new LoggerService();
  }
  // catch函数用来实现一个自定义异常过滤器
  // HttpException是异常信息对象，Nestjs内置了默认的全局异常过滤器，处理能够转换成HttpException的异常。如果是HttpException或其子类异常，
  // 可以在它身上获取到HttpException及其子类的异常信息
  // ArgumentHost是原始请求的包装器，NestJs支持HTTP/GRPC/WebSocket（一般只用http）
  catch(exception: HttpException, host: ArgumentsHost) {
    // 切换http请求
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionRes = exception.getResponse();

    // 控制台打印并写入文件
    this.Logger.error(
      `当前请求路径是:${request.url}，请求方法是:${request.method}`,
      JSON.stringify(exceptionRes),
    );

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(exceptionRes);
  }
}
