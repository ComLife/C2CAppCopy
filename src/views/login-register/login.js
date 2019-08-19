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
import Header from "../../components/Header";

const Login = memo(props => {
  return (
    <Fragment>
      <SafeAreaView />
      <ScrollView scrollEnabled={false}>
        <Header onPressLeft={() => props.navigation.goBack()} />
      </ScrollView>
    </Fragment>
  );
});
export default Login;
