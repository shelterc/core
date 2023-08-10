import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from 'src/plugin/redis';
import { RedisService } from 'src/plugin/redis/redis.service';

@Injectable()
export class TestService {
  constructor(
    @InjectRedis() private readonly redisClient: Redis,
    private readonly redisService: RedisService,
  ) {}

  async get1(key: string): Promise<string> {
    return await this.redisService.get(key);
  }

  async get2(key: string): Promise<string> {
    return await this.redisClient.get(key);
  }
}
