import React, {memo, useEffect, useState} from 'react';
import {AppState, DeviceEventEmitter, Image, Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Imgs from '../../configs/images';
import Header from '../../components/Header';
import Store from 'react-native-simple-store';
import UIColor from '../../configs/colors';
import {Button} from 'space-ui';
import BaseService from '../../services/base';
import {getDecryptWithAES} from '../../utils/safe-encrypt';
import {loginAction} from '../../redux/actions/base';
import {connect} from 'react-redux';
import {EasyToast} from '../../components/toast';
import {DeviceEventName, requestConfig} from '../../configs';

const Login = memo(props => {
  const [country, setCountry] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const updateCode = res => {
    if (res.view === 'Login') {
      setAreaCode(res.code);
      setCountry(res.country);
    }
  };

  useEffect(() => {
    DeviceEventEmitter.addListener(DeviceEventName.refresh_areaCode, updateCode);
    return () => {
      DeviceEventEmitter.removeListener(DeviceEventName.refresh_areaCode, updateCode);
    };
  });

  useEffect(() => {
    Store.get('account').then(account => {
      if (account) {
        setPhone(account);
      }
    });
    Store.get('areaCode').then(areaCode => {
      if (areaCode) {
        setAreaCode(areaCode);
      } else {
        setAreaCode(86);
      }
    });
    Store.get('country').then(country => {
      if (country) {
        setCountry(country);
      } else {
        setCountry('中国大陆');
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
    const originResp = await BaseService.loginRequest({
      phone: `+${areaCode}-${phone}`,
      password,
      encrypt_flag: false,
    });
    const decryptResult = getDecryptWithAES(originResp.result);
    const result = JSON.parse(decryptResult);
    console.log('login data=', result);
    if (result.code === '1') {
      Store.save('account', phone);
      Store.save('areaCode', areaCode);
      Store.save('country', country);
      requestConfig.headers.token = result.data.token || '';
      requestConfig.headers.uid = result.data.uid || '';
      props.login(result.data);
      props.navigation.navigate('TabHome');
    } else {
      EasyToast.show(result.msg);
    }
  };

  const isDisabled = !(phone && password ? true : false);
  return (
    <SafeAreaView>
      <Header onPressLeft={() => props.navigation.goBack()} />
      <View style={styles.loginView}>
        <Image source={Imgs.icon_logo} style={styles.titleHeaderImage} />
        <TouchableOpacity
          style={styles.countryView}
          onPress={() =>
            props.navigation.navigate('Internationalization', {
              view: 'Login',
            })
          }>
          <Text style={styles.phoneHeader}>{country}</Text>
          <Text style={styles.phoneHeader}>{`+${areaCode}`}</Text>
          <Image source={Imgs.icon_choice} />
        </TouchableOpacity>
        <TextInput
          style={styles.codeInput}
          autoCapitalize="none"
          onChangeText={onPhoneChange}
          keyboardType={'numeric'}
          placeholder={'手机号'}
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
          placeholder={'密码'}
        />
        <View style={styles.inputDiving} />

        <Button onPress={onLoginPress} disabled={isDisabled} style={styles.loginButton} textStyle={styles.btnText} disableColor={UIColor.disPressColor}>
          登录
        </Button>

        <Text style={styles.forgotPassText} onPress={() => props.navigation.navigate('ForgotPassword')}>
          忘记密码
        </Text>
        <View style={styles.registerTextView}>
          <Text style={styles.registerText}>还没注册账号？</Text>
          <Text style={styles.onRegisterText} onPress={() => props.navigation.navigate('Register')}>
            去注册
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
});

const mapDispatchToProps = disPatch => {
  return {
    login: obj => {
      disPatch(loginAction(obj));
    },
  };
};
// export default Login;
export default connect(
  null,
  mapDispatchToProps,
)(Login);
