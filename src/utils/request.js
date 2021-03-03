import axios from 'axios';
import { config } from 'ice';
import { message } from 'antd';

const request = axios.create({
  timeout: 300 * 1000, // 请求超时时间，因为上传文件可能较慢，设置为5分钟
  baseURL: config.baseUrl,
});

request.defaults.withCredentials = true;

// axios 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 参数错误
    if (response.data.code == 400) {
      message.error('请检查参数');
    }
    // 服务器内部错误
    if (response.data.code == 500) {
      message.error('服务器异常');
    }
    return response;
  },
  (err) => {
    // message.error('请求失败');
    return Promise.reject(err);
  },
);

export default request;
