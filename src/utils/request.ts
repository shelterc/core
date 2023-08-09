import axios, { AxiosResponse, AxiosInstance, AxiosError } from 'axios';

export interface IResponse<T = any> {
  code?: number;
  msg?: string;
  data?: T;
}

// 异常处理器
const errHandler = (err: AxiosError) => {
  console.log(
    '%c' + ' 请求发生错误 ===> ' + err?.message,
    'color:#f07373;font-weight:bold',
  );
  return Promise.reject(err);
};

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  timeout: 20000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  return config;
}, errHandler);

// 响应拦截器
request.interceptors.response.use((res: AxiosResponse) =>
  Promise.resolve(res.data),
);

export default request;
