import React, { memo, useEffect, useState, Fragment } from "react";
import {
  AppState,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import Store from "react-native-simple-store";
import { Button } from "space-ui";
import styles from "./styles";
import Header from "../../components/Header";
import UIColor from "../../configs/colors";
import BaseService from "../../services/base";
import { EasyToast } from "../../components/toast";
import useInterval from "../../components/use-interval";
import Imgs from "../../configs/images";

const Login = memo(props => {
  const [country, setCountry] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [noteCode, setNoteCode] = useState("");
  const [waitTime, setWaitTime] = useState(0);
  const [backgroundTime, setBackgroundTime] = useState(0);
  const [isRegister, setIsRegister] = useState(false);

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

  useEffect(() => {
    console.log("register=", props);
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === "background") {
        // 即将切到后台
        setBackgroundTime(new Date().getTime() / 1000);
      }
      if (nextAppState === "active") {
        const leftTime = new Date().getTime() / 1000 - backgroundTime;
        let waitTimeCopy = Math.floor(waitTime - leftTime);
        waitTimeCopy = waitTimeCopy <= 0 ? 0 : waitTimeCopy;
        // @ts-ignore
        setWaitTime(waitTimeCopy);
      }
    };

    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  });

  const onGetCodePress = () => {
    Keyboard.dismiss();
    // EasyShowLD.loadingShow("发送中");
    // // eslint-disable-next-line @typescript-eslint/camelcase
    // props.registerCodeRequest({
    //   auth_type: 1,
    //   auth_data: `+${areaCode}-${phone}`
    // });
  };

  const onPhoneChange = (text: string) => {
    setPhone(text);
  };
  const onNoteCodeChange = (text: string) => {
    setNoteCode(text);
  };

  const nextIsPress = !(phone && noteCode ? true : false);
  return (
    <SafeAreaView>
      <Header onPressLeft={() => props.navigation.goBack()} />
      <View style={styles.loginView}>
        <Text style={styles.registerTitle}>注册</Text>
        <TouchableOpacity
          style={styles.countryView}
          onPress={() =>
            props.navigation.navigate("Internationalization", {
              view: "Register"
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
          value={phone}
          placeholderTextColor={UIColor.colorB3}
          placeholder={"手机号"}
        />
        <View style={styles.inputDiving} />

        <View style={styles.getCodeInputView}>
          <TextInput
            style={styles.noteCodeInput}
            autoCapitalize="none"
            onChangeText={onNoteCodeChange}
            keyboardType={"numeric"}
            value={noteCode}
            placeholderTextColor={UIColor.colorB3}
            placeholder={"验证码"}
          />
          {waitTime === 0 ? (
            <Text
              style={[
                styles.codeText,
                { color: phone ? UIColor.colorA1 : UIColor.colorB3 }
              ]}
              onPress={phone ? onGetCodePress : undefined}
            >
              获取验证码
            </Text>
          ) : (
            <Text style={styles.codeText}>{`${waitTime}s`}</Text>
          )}
        </View>
        <View style={styles.inputDiving} />
        <Button
          style={styles.loginButton}
          disabled={nextIsPress}
          textStyle={styles.btnText}
          onPress={() => setIsRegister(true)}
          disableColor={UIColor.disPressColor}
        >
          下一步
        </Button>

        <View style={styles.registerTextView}>
          <Text style={styles.registerText}>已有账号？</Text>
          <Text
            style={styles.onRegisterText}
            onPress={() => props.navigation.goBack()}
          >
            去登录
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
});

// export default Login;
export default connect(
  null,
  null
)(Login);
