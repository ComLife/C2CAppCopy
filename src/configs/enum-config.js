export const ERROR_CODE = {
  SUCCESS: "1", // 成功
  TOKEN_FAIL: "403", // Token验证失败
  OTHER_LOGIN: "405", // 其他设备登录,密码必须明文输入
  FOUND_PASSWORD_UNSET: "712", // 资金密码未设置
  LOGIN_AUTH_ERROR: "603", // 登录验证失败
  BINDING_ERROR: "617", // 签约理财未绑定支付宝
  LOGIN_ERROR: "10001", // 用户名密码错误
  SYSTEM_MAINTENANCE: "415" // 系统维护中
};

export const DeviceEventType = {
  REFRESH_LOGIN_TOKEN: "REFRESH_LOGIN_TOKEN",
  RE_LOGIN: "RE_LOGIN"
};

export const DeviceEventName = {
  refresh_areaCode: "refresh_areaCode" // 刷新区域码
};
