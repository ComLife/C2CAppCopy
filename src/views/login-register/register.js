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
import { connect } from "react-redux";
import Store from "react-native-simple-store";
import { Button } from "space-ui";
import styles from "./styles";
import Header from "../../components/Header";
import UIColor from "../../configs/colors";
import BaseService from "../../services/base";
import { EasyToast } from "../../components/toast";

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

  return (
    <SafeAreaView>
      <Header onPressLeft={() => props.navigation.goBack()} />
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
)(Login);
