// 登录
export const login = { path: '/api/base/login', needSign: true, encryptRequest: true, decryptResponse: true };
// 注册验证码
export const registerCode = { path: '/api/base/register/code', needSign: false, encryptRequest: false, decryptResponse: false };
// 找回密码验证码
export const loginpwdCode: Props = { path: '/api/base/loginpwd/code' };
// 密码确认修改
export const loginpwdReset: Props = { path: '/api/base/loginpwd/reset', needSign: true, encryptRequest: true };
// 注册
export const register: Props = { path: '/api/base/register' };
