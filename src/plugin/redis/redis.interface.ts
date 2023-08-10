import { ModuleMetadata } from '@nestjs/common';
import { RedisOptions } from 'ioredis';

export interface RedisModuleOptions extends RedisOptions {}
export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
  inject?: any[];
}
