import { Inject } from '@nestjs/common';
import { REDIS_CLIENTS } from './redis.contanst';

export const InjectRedis = () => {
  return Inject(REDIS_CLIENTS);
};
