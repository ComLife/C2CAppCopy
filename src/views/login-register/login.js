import React, { memo, useEffect, useState, Fragment } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import styles from "./styles";
import Imgs from "../../configs/images";
import Header from "../../components/Header";
import Store from "react-native-simple-store";
import UIColor from "../../configs/colors";
import { Button } from "space-ui";
import BaseService from "../../services/base";
import { getDecryptWithAES } from "../../utils/safe-encrypt";
import { loginAction } from "../../redux/actions/base";
import { connect } from "react-redux";

const Login = memo(props => {
  const [country, setCountry] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Store.get("areaCode").then(areaCode => {
      if (areaCode) {
        setAreaCode(areaCode);
      } else {
        setAreaCode(86);
      }
    });
    Store.get("country").then(country => {
      if (country) {
        setCountry(country);
      } else {
        setCountry("中国大陆");
      }
    });
  }, []);

  const onPhoneChange = (text: string) => {
    setPhone(text);
  };

  const onPwdChange = (text: string) => {
    setPassword(text);
  };

  const onLoginPress = async () => {
    Keyboard.dismiss(); // 把弹出的键盘收回去，同时使当前的文本框失去焦点。
    const originResp: any = await BaseService.loginRequest({
      phone,
      password,
      encrypt_flag: false
    });
    const decryptResult = getDecryptWithAES(originResp.result);
    const result = JSON.parse(decryptResult);
    if (result.code === "1") {
      props.login(result.data);
    }
  };

  const isDisabled = !(phone && password ? true : false);
  return (
    <Fragment>
      <SafeAreaView>
        <Header onPressLeft={() => props.navigation.goBack()} />
        <View style={styles.loginView}>
          <Image source={Imgs.icon_logo} style={styles.titleHeaderImage} />
          <TouchableOpacity
            style={styles.countryView}
            onPress={() =>
              props.navigation.navigate("Internationalization", {
                view: "Login"
              })
            }
          >
            <Text style={styles.phoneHeader}>{country}</Text>
            <Text style={styles.phoneHeader}>{`+${areaCode}`}</Text>
            <Image source={Imgs.icon_choice} />
          </TouchableOpacity>
          <TextInput
            style={styles.codeInput}
            autoCapitalize="none"
            onChangeText={onPhoneChange}
            keyboardType={"numeric"}
            placeholder={"手机号"}
            value={phone}
            placeholderTextColor={UIColor.colorB3}
          />
          <View style={styles.inputDiving} />

          <TextInput
            style={styles.passInput}
            autoCapitalize="none"
            onChangeText={onPwdChange}
            secureTextEntry
            placeholderTextColor={UIColor.colorB3}
            placeholder={"密码"}
          />
          <View style={styles.inputDiving} />

          <Button
            onPress={onLoginPress}
            disabled={isDisabled}
            style={styles.loginButton}
            textStyle={styles.btnText}
            disableColor={UIColor.disPressColor}
          >
            登录
          </Button>

          <Text
            style={styles.forgotPassText}
            // onPress={() => navigate("ForgotPassword")}
          >
            忘记密码
          </Text>
          <View style={styles.registerTextView}>
            <Text style={styles.registerText}>还没注册账号？</Text>
            <Text
              style={styles.onRegisterText}
              // onPress={() => navigate("Register")}
            >
              去注册
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
});

const mapDispatchToProps = disPatch => {
  return {
    login: obj => {
      disPatch(loginAction(obj));
    }
  };
};
// export default Login;
export default connect(
  null,
  mapDispatchToProps
)(Login);
