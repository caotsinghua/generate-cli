import Mock from 'mockjs';
import { login, logout, getUserInfo, getUserStatus } from './login';
import { getArticles } from './data';
// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
    timeout: 1500
});

// 登录相关和获取用户信息
Mock.mock(/\/login/, login);
Mock.mock(/\/get_info/, getUserInfo);
Mock.mock(/\/logout/, logout);
Mock.mock(/\/user\/status/, getUserStatus);
Mock.mock(/\/articles/, getArticles);
export default Mock;
