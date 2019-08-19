import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

const uiWidth = 621;
const uiHeight = 1344;

const iphoneXWidth = 375;
const iphoneXHeight = 812;
const iphoneXXWidth = 414;
const iphoneXXHeight = 896;

const ScreenSize = Dimensions.get("window");
const scale = Math.max(
  ScreenSize.height / uiHeight,
  ScreenSize.width / uiWidth
);
const pixelRatio = PixelRatio.get();
const fontScale = PixelRatio.getFontScale();
export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";
const screenRatio = Platform.OS === "ios" ? ScreenSize.width / uiWidth : scale;

export const setRatio = (value: number) => {
  return screenRatio * value;
};

export const setText = (value: number) => {
  const number = Math.round(((value * scale + 0.5) * pixelRatio) / fontScale);
  return number / pixelRatio;
};

export const isIphoneX = () => {
  return (
    Platform.OS === "ios" &&
    ((ScreenSize.width === iphoneXWidth &&
      ScreenSize.height === iphoneXHeight) ||
      (ScreenSize.width === iphoneXWidth && ScreenSize.width === iphoneXHeight))
  );
};
export const isIphoneXX = () => {
  return (
    Platform.OS === "ios" &&
    ((ScreenSize.width === iphoneXXWidth &&
      ScreenSize.height === iphoneXXHeight) ||
      (ScreenSize.height === iphoneXXWidth &&
        ScreenSize.width === iphoneXXHeight))
  );
};
export const moreHeight =
  Platform.OS === "android"
    ? StatusBar.currentHeight
    : isIphoneX() || isIphoneXX()
    ? 44
    : 20;

const majorVersionIOS = parseInt(Platform.Version, 10);
export const statusBarHeight =
  (majorVersionIOS < 11 ? 20 : 0) +
  (isIphoneX() || isIphoneXX()
    ? setRatio(8)
    : Platform.OS === "android"
    ? StatusBar.currentHeight
    : 0);
