import { Injectable } from '@nestjs/common';
import wxConfig from 'src/config/wx.config';
import * as sha1 from 'sha1';
import {
  IWxAccessToken,
  IWxConfigVerification,
  IWxGotItUserInfo,
} from './wxConfig.interface';
import { errResult } from 'src/common/result/result';
import { Response } from 'express';
import {
  getAccessTokenApi,
  getFollowUserListApi,
  getUserInfoApi,
  getWxGzhTokenApi,
} from './wxConfig.api';

@Injectable()
export class WxConfigService {
  /**
   * @author: rain
   * @description: 配置接口信息
   * @param {IwxConfigVerification} params
   * @return {*}
   */
  async wxVerificationService(params: IWxConfigVerification) {
    try {
      const { nonce, signature, timestamp, echostr } = params;
      const { token } = wxConfig;
      const str = [token, timestamp, nonce].sort().join('');
      const sha1Str = sha1(str);
      if (sha1Str === signature) {
        return echostr;
      } else {
        throw new errResult(401, '校验失败');
      }
    } catch (error) {
      throw new errResult(500, error);
    }
  }

  /**
   * @author: rain
   * @description: 微信重定向
   * @return {*}
   */
  wxAuthorizePathService() {
    return `${wxConfig.wxAuth_url}?appid=${wxConfig.appId}&redirect_uri=${wxConfig.redirect_url}&response_type=code&scope=${wxConfig.scoped}&state=STATE#wechat_redirect`;
  }

  /**
   * @author: rain
   * @description: 授权重定向再返回
   * @param {string} code
   * @param {Response} res
   * @return {*}
   */
  wxRedirect(code: string, res: Response) {
    res.redirect(`${wxConfig.backend_url}/wx/userinfo?code=${code}`);
  }

  /**
   * @author: rain
   * @description:获取用户基本信息
   * @param {string} code
   * @return {*}
   */
  async getWxGetUserInfoService(code: string) {
    try {
      const res: IWxAccessToken = await getAccessTokenApi(code);
      if (res.access_token) {
        const info: IWxGotItUserInfo = await getUserInfoApi(res);
        if (info.openid) {
          return info;
        } else {
          return '授权失败';
        }
      }
    } catch (error) {
      throw new errResult(500, error);
    }
  }

  /**
   * @author: rain
   * @description: 获取公众号关注列表
   * @return {*}
   */
  async wxFollowUserInfo() {
    try {
      const res = await getWxGzhTokenApi();
      if (res.access_token) {
        return await getFollowUserListApi(res.access_token);
      }
    } catch (error) {
      throw new errResult(500, error);
    }
  }
}
