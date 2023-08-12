import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger, runtime } from './runtime';
import { resTransformInterceptor } from './Interceptors/res.transform.interceptor';
import { HttpExceptionFilterClass } from './filters/http.exception.filter';
import { ValidationPipe } from '@nestjs/common';
import createSwagger from './swagger';
import { AuthGuard } from './guard/auth.guard';
import { JwtAuthGuard } from './guard/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { address, port } = runtime();
  // 使用全局管道验证参数
  app.useGlobalPipes(new ValidationPipe());
  // 拦截响应统一数据格式
  app.useGlobalInterceptors(new resTransformInterceptor());
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilterClass());
  // 设置全局守卫
  // app.useGlobalGuards(new JwtAuthGuard('jwt'));
  // 处理跨域
  app.enableCors();
  // 设置路由前缀
  app.setGlobalPrefix('api');
  createSwagger(app);
  await app.listen(port, () => {
    logger(address, port);
  });
}
bootstrap();
