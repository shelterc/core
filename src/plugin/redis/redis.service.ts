import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENTS } from './redis.contanst';
import Redis from 'ioredis';
@Injectable()
export class RedisService {
  private redis: Redis;
  constructor(@Inject(REDIS_CLIENTS) redisClient: Redis) {
    this.redis = redisClient;
  }

  async get(key: string) {
    return this.redis.get(key);
  }
}
