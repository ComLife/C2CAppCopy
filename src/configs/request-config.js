import {Platform} from 'react-native';

const Config = {
  isHttps: true,
  isDev: true,
  httpPrefix: 'https://',
  wsPrefix: 'wss://',
  baseUrl: 'api.jlpfcj.com',
  baseAwsUrl: 'jlpfcj.com',
  baseBBSUrl: 'bbsapi.jlpfcj.com',
  wsUrl: 'bbsconnect.jlpfcj.com/websocket',
  zendeskUri: 'https://stowhite.zendesk.com',
  headers: {
    'Content-Type': 'application/json',
    deviceid: '',
    versionId: '1.0.2',
    uid: '',
    token: '',
    securityflag: true,
    sign: '',
    appname: 'c2cApp',
    appsource: '',
    signature: '',
  },
  versionName: `c2c_${Platform.OS}`,
  bundleId: '',
  encrypt_pwd: '',
  progressEnv: 'pre',
  capitalpass: false,
};

export default Config;
