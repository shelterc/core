import Redis, { RedisOptions } from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisFactory {
  private redisClient: Redis;

  constructor(options: RedisOptions) {
    this.redisClient = new Redis(options);
  }

  getRedisClient(): Redis {
    return this.redisClient;
  }
}
