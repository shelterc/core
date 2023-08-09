import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger, runtime } from './runtime';
import createSwagger from './swagger';
import { resTransformInterceptor } from './Interceptors/res.transform.interceptor';
import { HttpExceptionFilter } from './filters/http.exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { address, port } = runtime();
  // 使用全局管道验证参数
  app.useGlobalPipes(new ValidationPipe());
  // 拦截响应统一数据格式
  app.useGlobalInterceptors(new resTransformInterceptor());
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 处理跨域
  app.enableCors();
  createSwagger(app);
  await app.listen(port, () => {
    logger(address, port);
  });
}
bootstrap();
