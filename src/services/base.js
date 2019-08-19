import Request from "./request";
import { login } from "../configs/request-path";
import Config from "../configs/request-config";
import {
  getEncryptWithAES,
  getSigString,
  getSignWithRSAAndAES
} from "../utils/safe-encrypt";

export default new class BaseService extends Request {
  login(params = {}) {
    console.log("login req:", params);
    Config.headers.signature = login.needSign ? getSigString(params) : "";
    Config.headers.sign = login.encryptRequest ? getSignWithRSAAndAES() : "";
    const body = login.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + login.path,
      data: body
    })();
  }
}();
