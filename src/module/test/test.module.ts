import { Module } from '@nestjs/common';
import { TestController } from './test.contorllet';
import { TestService } from './test.service';
import { RedisModule } from '@/plugin/redis/redis.module';
@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
