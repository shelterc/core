import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { WxConfigService } from './wxConfig.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IWxConfigVerification } from './wxConfig.interface';

@Controller('wx')
@ApiTags('微信配置模块')
export class wxConfigController {
  constructor(private readonly wxConfigService: WxConfigService) {}

  @Get('/configVerification')
  @ApiOperation({ summary: '微信接口配置信息校验' })
  async wxConfigVerification(@Query() params: IWxConfigVerification) {
    return this.wxConfigService.wxVerificationService(params);
  }

  @Get('/redirect')
  @ApiOperation({ summary: '跳转网页授权' })
  wxRedirect() {
    return this.wxConfigService.wxAuthorizePathService();
  }

  @Get('/specifyRedirect')
  @ApiOperation({ summary: '后端指定重定向' })
  wxGetAuthRedirect(@Query('code') code: string, @Res() res) {
    return this.wxConfigService.wxRedirect(code, res);
  }

  @Get('/userInfo')
  @ApiOperation({ summary: '获取用户信息' })
  wxGetUserInfo(@Query('code') code) {
    return this.wxConfigService.getWxGetUserInfoService(code);
  }

  @Get('/follow')
  @ApiOperation({ summary: '获取公众号关注列表' })
  wxFollowList() {
    return this.wxConfigService.wxFollowUserInfo();
  }
}
