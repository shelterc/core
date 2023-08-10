import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENTS } from './redis.contanst';
import Redis from 'ioredis';
@Injectable()
export class RedisService {
  private redisClient: Redis;
  constructor(@Inject(REDIS_CLIENTS) redis: Redis) {
    this.redisClient = redis;
  }

  async get(key: string) {
    return this.redisClient.get(key);
  }

  async set(key: string, value: number | string, ttl?: number) {
    await this.redisClient.set(key, value);
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
