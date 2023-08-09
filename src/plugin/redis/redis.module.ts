import { Module, DynamicModule, Global } from '@nestjs/common';
import { RedisModuleAsyncOptions, RedisModuleOptions } from './redis.interface';
import { RedisFactory } from './redis.factory';
import { REDIS_CLIENTS } from './redis.contanst';
import { RedisService } from './redis.service';
@Global()
@Module({})
export class RedisModule {
  static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_CLIENTS,
          useValue: new RedisFactory(options).getRedisClient(),
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }

  // static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
  //   console.log('异步数据', async () => await options.useFactory());
  //   const redisProvider = {
  //     provide: REDIS_CLIENTS,
  //     useFactory: async (): Promise<RedisFactory> => {
  //       return new RedisFactory(options.useFactory());
  //     },
  //   };
  //   return {
  //     module: RedisModule,
  //     imports: options.imports || [],
  //     providers: [RedisService],
  //     exports: [RedisService],
  //   };
  // }
}
