import { ModuleMetadata } from '@nestjs/common';

export interface RedisModuleOptions {
  [key: string]: any;
}
export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
  inject?: any[];
}
