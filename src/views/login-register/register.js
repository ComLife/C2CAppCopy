import React, { memo, useEffect, useState, Fragment } from "react";
import {
  AppState,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
  View,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import Store from "react-native-simple-store";
import { Button } from "space-ui";
import styles from "./styles";
import Header from "../../components/Header";
import {UIColor, Imgs, DeviceEventName, ERROR_CODE, requestConfig} from "../../configs";
import BaseService from "../../services/base";
import { EasyToast } from "../../components/toast";
import useInterval from "../../components/use-interval";
import { loginAction } from "../../redux/actions/base";


const Register = memo(props => {
  const [country, setCountry] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
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

  const updateCode = res => {
    if (res.view === "Register") {
      setAreaCode(res.code);
      setCountry(res.country);
    }
  };

  useEffect(() => {
    DeviceEventEmitter.addListener(
        DeviceEventName.refresh_areaCode,
        updateCode
    );
    return () => {
      DeviceEventEmitter.removeListener(
          DeviceEventName.refresh_areaCode,
          updateCode
      );
    };
  });

  useInterval(
    () => {
      setWaitTime(waitTime - 1);
    },
    // @ts-ignore
    waitTime ? 1000 : null
  );

  const onGetCodePress = async () => {
    Keyboard.dismiss();
    await BaseService.registerCodeRequest({
      auth_type: 1,
      auth_data: `+${areaCode}-${phone}`
    }).then((originResp)=>{
      console.log("onGetCodePress =", originResp);
      if (originResp.code === ERROR_CODE.SUCCESS) {
        EasyToast.show("验证码发送成功，请注意查收");
        setWaitTime(60);
      }else{
        EasyToast.show(originResp.msg);
      }
    });
  };

  const onComfirClick = async () => {
    Keyboard.dismiss();
    if (password !== nextPassword) {
      EasyToast.show('两次密码不一致，请重新输入');
      return;
    }
    // props.registerResetRequest({ type: 1, phone: `+${areaCode}-${phone}`, password, code: noteCode });
    await BaseService.register({ type: 1, phone: `+${areaCode}-${phone}`, password, code: noteCode }).then((res)=>{
      if(res.code === ERROR_CODE.SUCCESS){
        Store.save("account", phone);
        Store.save("areaCode", areaCode);
        Store.save("country", country);
        props.login(res.data);
        requestConfig.headers.token = res.data.token || '';
        requestConfig.headers.uid = res.data.uid || '';
        props.navigation.navigate('CapitalPwdInit');
      }else{
        EasyToast.show(res.msg);
      }
    });
  };

  const onBackClick = () => {
    if (isRegister) {
      setIsRegister(false);
      setPassword("");
      setNextPassword("");
    } else {
      props.navigation.goBack();
    }
  };

  const onPhoneChange = (text: string) => {
    setPhone(text);
  };
  const onNoteCodeChange = (text: string) => {
    setNoteCode(text);
  };
  const onPwdChange = (text: string) => {
    setPassword(text);
  };
  const onNextPwdChange = (text: string) => {
    setNextPassword(text);
  };

  const nextIsPress = !(phone && noteCode ? true : false);
  const comfirIsPress = !(password && nextPassword ? true : false);
  return (
    <SafeAreaView>
      <Header onPressLeft={onBackClick} />
      {!isRegister ? (
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
      ) : (
        <View style={styles.loginView}>
          <Text style={styles.registerTitle}>设置密码</Text>
          <TextInput
            style={[styles.codeInput, { marginTop: 50 }]}
            autoCapitalize="none"
            onChangeText={onPwdChange}
            secureTextEntry
            value={password}
            placeholder={"请输入密码"}
          />
          <View style={styles.inputDiving} />
          <TextInput
            style={styles.passInput}
            autoCapitalize="none"
            onChangeText={onNextPwdChange}
            secureTextEntry
            value={nextPassword}
            placeholder={"请再次输入密码"}
          />
          <View style={styles.inputDiving} />
          <Button
            disabled={comfirIsPress}
            style={styles.loginButton}
            textStyle={styles.btnText}
            onPress={onComfirClick}
            disableColor={UIColor.disPressColor}
          >
            确认
          </Button>
        </View>
      )}
    </SafeAreaView>
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
)(Register);
