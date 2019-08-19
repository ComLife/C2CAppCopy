import { StyleSheet } from "react-native";
import { setRatio, setText } from "../../utils/screen-untils";

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
    marginTop: setRatio(80),
    fontSize: setText(27),
    color: UIColor.colorB1
  }
});
