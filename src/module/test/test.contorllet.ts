import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';
import { RedisService } from '../../plugin/redis/redis.service';

@Controller('/test')
@ApiTags('测试模块')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/getKey')
  @ApiOperation({ summary: '测试redis' })
  async test(@Query('key') key: string) {
    return this.testService.get(key);
  }
}
