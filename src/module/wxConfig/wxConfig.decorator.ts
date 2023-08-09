import { SetMetadata } from '@nestjs/common';

// 设置白名单 用于不跑进统一拦截器
export const Whitelist = () => SetMetadata('whitelisted', true);
