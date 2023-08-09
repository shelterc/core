import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisFactory {
  private redisClient: Redis;

  constructor(options: any) {
    this.redisClient = new Redis(options);
  }

  getRedisClient(): Redis {
    return this.redisClient;
  }
}
