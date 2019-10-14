import Request from './request';
import {
  login,
  loginpwdCode,
  loginpwdReset,
  register,
  registerCode,
} from '../configs/request-path';
import Config from '../configs/request-config';
import {
  getEncryptWithAES,
  getSigString,
  getSignWithRSAAndAES,
} from '../utils/safe-encrypt';

export default new class BaseService extends Request {
  // 登录
  loginRequest(params = {}) {
    console.log('login req:', params);
    Config.headers.signature = login.needSign ? getSigString(params) : '';
    Config.headers.sign = login.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = login.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + login.path,
      data: body,
    })();
  }

  // 注册验证码获取
  registerCodeRequest(params = {}) {
    Config.headers.sign = registerCode.encryptRequest
      ? getSignWithRSAAndAES()
      : '';
    const body = registerCode.encryptRequest
      ? getEncryptWithAES(params)
      : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + registerCode.path,
      data: body,
    })();
  }

  // 找回密码验证码获取
  loginpwdCode(params = {}) {
    console.log('loginpwdCode req:', params);
    Config.headers.sign = loginpwdCode.encryptRequest
      ? getSigString(params)
      : '';
    const body = loginpwdCode.encryptRequest
      ? getEncryptWithAES(params)
      : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + loginpwdCode.path,
      data: body,
    })();
  }

  // 找回密码重置
  loginpwdReset(params = {}) {
    console.log('loginpwdReset req:', params);
    Config.headers.signature = loginpwdReset.needSign
      ? getSigString(params)
      : '';
    Config.headers.sign = loginpwdReset.encryptRequest
      ? getSignWithRSAAndAES()
      : '';
    const body = loginpwdReset.encryptRequest
      ? getEncryptWithAES(params)
      : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + loginpwdReset.path,
      data: body,
    })();
  }

  // 注册
  register(params = {}) {
    console.log('register req:', params);
    Config.headers.sign = register.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = register.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + register.path,
      data: body,
    })();
  }
}();
