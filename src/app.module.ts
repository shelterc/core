import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WxConfigModule } from './module/wxConfig/wxConfig.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import { UserModule } from './module/user/user.module';
import { TestModule } from './module/test/test.module';
import { RedisModule } from './plugin/redis';
import { AuthModule } from './module/auth/auth.module';

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
    RedisModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return config.get('redis');
      },
      inject: [ConfigService],
    }),
    WxConfigModule,
    UserModule,
    TestModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  // 中间件
  configure(consumer: MiddlewareConsumer) {}
}
