// 登录
export const login = { path: '/api/base/login', needSign: true, encryptRequest: true, decryptResponse: true };
// 注册验证码
export const registerCode = { path: '/api/base/register/code', needSign: false, encryptRequest: false, decryptResponse: false };
