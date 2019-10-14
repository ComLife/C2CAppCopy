import CryptoJS from 'crypto-js';
// @ts-ignore
import {KEYUTIL, KJUR, hextob64} from 'jsrsasign';

const AESPublicKey = 'd7b85f6e214abcda';
const RSAPublicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPyz7mtdcercwAvc5mz9pm/LAnVKmSClHrTpU5sPGLY6Ulw7kryDRD2xxqP+toEU7UUr7qqkUkLI0IL1z75X3xuigqXvVUHgFhSKkoAbQG6aWJCKAVIbEDu9CbjlRj05oZ91gFtKqDyoTrOr8yB7OO09ZEi3ybkQg7n62D1WSGjwIDAQAB
-----END PUBLIC KEY-----`;

// 私钥
const privateKeyString = `
-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAL2SJzwq6hF2YByPLiq8nUEgOu7CnxWDGiyY3hHuLhwxyfZLEThsfZTRA4FB5wPbq5hOkRjz0TIQFCjngm7Q7LWHCmFUiwq6KvcmI3vutIPXHVP29ZxrLR5stcTDDiWJH+fb6ym70zDBfY7y20C1UuCzhKUWm6YgvF7uzze3EatbAgMBAAECgYAubz9nEIf3MQzH0haX502Jp1BoLYn0JgHiTKuQrsvioht7VdXpAUIdkrkOD0t7+XHlw9Ds0MQ8RA38GwErDcf9Ho79x4UCJA6RlliQqiTgGyNJJQDP8PuRl4+6qB4hgqphPmaMQb81NDH4rm5q2YCEaypPoJLOgV9LU1lhPgEDcQJBAPRehsXjon0CTJUJTIRWxIp0KkLXNfo/SLTTAQOT4JcLj039oF5/eh2zJPAqFSa8K0BTnLPEIA0VwvKjsLZOdxkCQQDGl/I/IPZDbkPytmdQooHrJ0zxNouJm2024kx3LS/FYZyGVyDXkhVoTg9cP/ToRQ9+JsxIdVXyAWbCUYEMboiTAkEAvjeOZR+qbfCKOEDCxQjdeICwHNN0+tSj/c15rpU/b5PZ+vWADc7g+ZlnGWNIj5xNdocfJXd3E3hrBYCRn3c4kQJAJCUTmhnNuIghJdO9ChgJvVrxzhU3YFxBjHOzpx06TJpveqPw/ktASjOq6Adb88pd/3/gPm/crKdEpKlg63pSsQJBAIoKQjmwqFrzYqRbKbAii865xOoWX9OYr6MHNs9giSvrk38PxsccfVXNXQRJYSl0smXo+y2E3yqzgGrPKeMMCnE=
-----END PRIVATE KEY-----`;

/**
 * 将 JSON 对象按 key 排序
 * @param json， 如：{"versionNo":"2.0.1","versionName":"wallet_ios"}
 * @returns {*}，如：{"versionName": "wallet_ios", "versionNo": "2.0.1"}
 */
export function objectSorting(json: any) {
  if (!json) {
    return {};
  }

  const keys = Object.keys(json).sort();
  const result: any = {};
  keys.forEach((key: string) => {
    result[key] = json[key];
  });

  return result;
}

/**
 * 获取 SHA256withRSA 加密后字符串
 * @param inputString，要加密的原字符串
 * @returns {string}，加密后的字符串
 * @note 已经跟后端约定：1、使用 PKCS8 密钥格式  2、密钥长度1024
 */
function getSHA256withRSA(inputString: string) {
  const key = KEYUTIL.getKey(privateKeyString);
  // 创建 Signature 对象，设置签名编码算法
  const signature = new KJUR.crypto.Signature({alg: 'SHA256withRSA'});
  // 初始化
  signature.init(key);
  // 传入待加密字符串
  signature.updateString(inputString);
  // 生成密文
  const originSign = signature.sign();
  return originSign;
}

/**
 * 将 JSON 对象的 value 值转换为字符串拼接起来，最后用 SHA256 加密，并且进行rsa进行处理
 * @param json， 如：{"versionNo":"2.0.1","versionName":"wallet_ios"}
 * @returns {*}，如：08b8ecea292e6f057973d458abc442d87e049831ba17941da372ebef4f0289fd
 * @note 验签需求
 */
export function getSigString(json: any) {
  const jsonObj = objectSorting(json);
  let valueString = '';
  Object.values(jsonObj).forEach(value => {
    if (value !== null && value !== undefined && value !== '') {
      valueString += `${value}`;
    }
  });
  return getSHA256withRSA(valueString);
}

/**
 * 获取加密的sign
 * @returns string
 * @note 每次返回的值不一样，但长度是172位
 */
export function getSignWithRSAAndAES() {
  // 加密
  let pub = KEYUTIL.getKey(RSAPublicKey);
  let enc = KJUR.crypto.Cipher.encrypt(AESPublicKey, pub);
  return hextob64(enc);
}

/**
 * 获取通过 AES 签名
 * @param json
 * @returns {*}
 * @note 用于加密 request body 内容
 */
export function getEncryptWithAES(json: any) {
  if (!json) {
    return '';
  }
  const jsonString = JSON.stringify(json);
  const secretPassphrase = CryptoJS.enc.Utf8.parse(AESPublicKey);
  const cipherOption = {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7};
  const aesEncryptString = CryptoJS.AES.encrypt(
    jsonString,
    secretPassphrase,
    cipherOption,
  ).toString();
  return aesEncryptString;
}

/**
 * 用 AES 解密字符中，得到原文字符
 * @param inputString
 * @returns 解密后的内容
 * @note 用于解密 response body 的内容
 */
export function getDecryptWithAES(inputString: string) {
  if (!inputString) {
    return '';
  }
  const cipherOption = {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7};
  const decrypt = CryptoJS.AES.decrypt(
    inputString,
    CryptoJS.enc.Utf8.parse(AESPublicKey),
    cipherOption,
  );
  const jsonString = CryptoJS.enc.Utf8.stringify(decrypt).toString();
  return jsonString;
}
