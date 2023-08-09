import { Module } from '@nestjs/common';
import { wxConfigController } from './wxConfig.controller';
import { WxConfigService } from './wxConfig.service';

@Module({
  imports: [],
  controllers: [wxConfigController],
  providers: [WxConfigService],
})
export class WxConfigModule {}
