import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisFactory } from 'src/plugin/redis/redis.factory';
import { RedisService } from 'src/plugin/redis/redis.service';

@Injectable()
export class TestService {
  constructor(private readonly redisService: RedisService) {}
  async get(key: string) {
    return this.redisService.get(key);
  }
}
