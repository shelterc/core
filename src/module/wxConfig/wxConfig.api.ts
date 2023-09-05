import wxConfig from '@/config/wx.config';
import request from '@/utils/request';
import {
  IWxAccessToken,
  IWxGotItUserInfo,
  IWxRefreshToken,
  IWxTemplate,
  IWxUserInfo,
} from './wxConfig.interface';

/**
 * @author: rain
 * @description: 获取用户access_token
 * @return {*}
 */
export const getAccessTokenApi = (
  code: number | string,
): Promise<IWxAccessToken | any> => {
  return request({
    url: `${wxConfig.wxRequestPath}/sns/oauth2/access_token?appid=${wxConfig.appId}&secret=${wxConfig.appSecret}&code=${code}&grant_type=authorization_code`,
    method: 'get',
  });
};

/**
 * @author: rain
 * @description: 获取用户信息
 * @return {*}
 */
export const getUserInfoApi = (
  params: IWxUserInfo,
): Promise<IWxGotItUserInfo | any> => {
  return request({
    url: `${wxConfig.wxRequestPath}/sns/userinfo?access_token=${params.access_token}&openid=${params.openid}&lang=`,
    method: 'get',
  });
};

/**
 * @author: rain
 * @description: 刷新token
 * @return {*}
 */
export const refreshWxTokenApi = (
  refreshToken: string,
): Promise<IWxRefreshToken | any> => {
  return request({
    url: `${wxConfig.wxRequestPath}/sns/oauth2/refresh_token?appid=${wxConfig.appId}&grant_type=refresh_token&refresh_token=${refreshToken}`,
  });
};

/**
 * @author: rain
 * @description: 发送模板信息
 * @param {*} data
 * @return {*}
 */
export const wxTemplateMsgApi = (data): Promise<IWxTemplate | any> => {
  return request({
    url: `${wxConfig.wxRequestPath}/cgi-bin/message/template/send?access_token=${data.access_token}`,
    method: 'post',
    data,
  });
};

/**
 * @author: rain
 * @description: 获取微信公众号关注列表
 * @param {string} access_token5r
 * @return {*}
 */
export const getFollowUserListApi = (access_token: string) => {
  return request({
    url: `${wxConfig.wxRequestPath}/cgi-bin/user/get?access_token=${access_token}&next_openid=`,
  });
};

/**
 * @author: rain
 * @description: 获取公众号Access token
 * @return {*}
 */
export const getWxGzhTokenApi = (): Promise<
  { access_token: string; expires_in: number } | any
> => {
  return request({
    url: `${wxConfig.wxRequestPath}/cgi-bin/token?grant_type=client_credential&appid=${wxConfig.appId}&secret=${wxConfig.appSecret}`,
  });
};

/**
 * @author: rain
 * @description: 自定义菜单
 * @param {any} data
 * @param {string} access_token
 * @return {*}
 */
export const customBtnApi = (data: any, access_token: string) => {
  return request({
    url: `${wxConfig.wxRequestPath}/cgi-bin/menu/create?access_token=${access_token}`,
    method: 'post',
    data,
  });
};

// 判断用户是否关注公众号
export const isSubscribeWxGzhApi = (params: {
  access_token: string;
  openid: string;
}): Promise<any> => {
  return request({
    url: `${wxConfig.wxRequestPath}/cgi-bin/user/info?access_token=${params.access_token}&openid=${params.openid}&lang=zh_CN`,
  });
};
