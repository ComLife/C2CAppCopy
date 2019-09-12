import { DeviceEventEmitter } from "react-native";
import axios from "axios";
import Config from "../configs/request-config";
import { DeviceEventType, ERROR_CODE } from "../configs/enum-config";

export default class Request {
  constructor() {
    this.instance = axios.create({ timeout: 30 * 1000 });
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        console.warn("axios request warn:", error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      res => {
        const { data } = res;
        if (data.code === ERROR_CODE.TOKEN_FAIL) {
          // 拿旧token，换新token
          DeviceEventEmitter.emit(DeviceEventType.REFRESH_LOGIN_TOKEN);
        } else if (data.code !== ERROR_CODE.SUCCESS) {
          console.warn("不成功:", data.code);
        }
        return res;
      },
      error => {
        console.warn("axios response warn:", error);
        return Promise.reject(error);
      }
    );
  }

  request(config) {
    config = {
      withCredentials: true,
      method: "POST",
      headers: Config.headers,
      ...config
    };
    return () => {
      return this.instance.request(config).then(async res => {
        console.log("this.instance.request.config =", config);
        console.log("this.instance.request.then =", res.data);
        return res.data;
      });
    };
  }
}
