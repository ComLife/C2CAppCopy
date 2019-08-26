import React from "react";
import { TextInput as Input, StyleSheet } from "react-native";

import styles from "./styles";

export default class TextInput extends Input {
  static defaultProps = {
    style: {}
  };

  render() {
    const { style, ...props } = this.props;
    const mergedStyle = StyleSheet.flatten([styles.container, style]);
    return (
      <Input
        autoCapitalize="none"
        placeholder="请输入"
        autoCorrect={false}
        placeholderTextColor="#c4c4c4"
        underlineColorAndroid={"transparent"}
        style={mergedStyle}
        {...props}
      />
    );
  }
}
