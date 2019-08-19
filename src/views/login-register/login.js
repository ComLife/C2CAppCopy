import React, { memo, useEffect, useState, Fragment } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import styles from "./styles";
import Imgs from "../../configs/images";
import Header from "../../components/Header";

const Login = memo(props => {
  return (
    <Fragment>
      <SafeAreaView />
      <ScrollView scrollEnabled={false}>
        <Header onPressLeft={() => props.navigation.goBack()} />
        <View style={styles.loginView}>
          <Image source={Imgs.icon_logo} style={styles.titleHeaderImage} />
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
        </View>
      </ScrollView>
    </Fragment>
  );
});
export default Login;
