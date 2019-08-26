import { StyleSheet } from "react-native";
import { setRatio, setText } from "../../utils/screen-untils";
import UIColor from "../../configs/colors";

export default StyleSheet.create({
  loginView: {
    marginHorizontal: setRatio(45)
  },
  titleHeaderImage: {
    width: setRatio(315),
    height: setRatio(55),
    resizeMode: "contain"
  },
  codeInput: {
    height: setRatio(70),
    fontWeight: "bold",
    marginTop: setRatio(30),
    fontSize: setText(27),
    color: UIColor.colorB1
  },
  countryView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: setRatio(60),
    height: setRatio(80)
  },
  phoneHeader: {
    fontSize: setText(24),
    color: UIColor.colorB1,
    fontWeight: "bold",
    marginRight: setRatio(10)
  },
  inputDiving: {
    height: setRatio(2),
    backgroundColor: UIColor.colorB4
  },
  passInput: {
    height: setRatio(70),
    fontWeight: "bold",
    marginTop: setRatio(50),
    fontSize: setText(27),
    color: UIColor.colorB1
  },
  loginButton: {
    marginTop: 50,
    height: setRatio(74),
    backgroundColor: UIColor.btnOnpressColor
  },
  btnText: {
    fontWeight: "bold",
    color: UIColor.whiteColor,
    fontSize: setText(27)
  },
  forgotPassText: {
    marginTop: setRatio(30),
    fontSize: setText(22),
    width: setRatio(100),
    color: UIColor.colorA1
  },
  registerTextView: {
    flexDirection: "row",
    marginBottom: setRatio(50),
    marginTop: setRatio(150)
  },
  registerText: {
    fontSize: setText(27),
    color: UIColor.colorB3
  },
  onRegisterText: {
    fontSize: setText(27),
    color: UIColor.colorA1,
    fontWeight: "bold"
  }
});
