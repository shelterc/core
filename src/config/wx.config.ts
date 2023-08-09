const wxConfig = {
  appId: process.env.WX_APP_ID,
  appSecret: process.env.WX_APP_SECRET,
  token: 'nothing',
  scoped: 'snsapi_userinfo',
  wxRequestPath: 'https://api.weixin.qq.com',
  redirect_url: 'http://rainc.free.idcfengye.com/wx/specifyRedirect',
  wxAuth_url: 'https://open.weixin.qq.com/connect/oauth2/authorize',
  backend_url: 'http://rainc.free.idcfengye.com',
};

export default wxConfig;
