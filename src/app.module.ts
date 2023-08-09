import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WxConfigModule } from './module/wxConfig/wxConfig.module';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import { UserModule } from './module/user/user.module';
import { TestModule } from './module/test/test.module';
import { RedisModule } from './plugin/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return config.get('mysql');
      },
      inject: [ConfigService],
    }),
    // 同步
    RedisModule.forRoot({
      port: 6379,
      host: 'localhost',
      username: 'default',
      password: 'my-top-secret',
      db: 0,
    }),
    // 异步
    // RedisModule.forRootAsync({
    //   useFactory: (config: ConfigService) => {
    //     console.log('redis', config);
    //     return config.get('redis');
    //   },
    //   inject: [ConfigService],
    // }),
    WxConfigModule,
    UserModule,
    TestModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  // 中间件
  configure(consumer: MiddlewareConsumer) {}
}
