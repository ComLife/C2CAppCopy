import React, { PureComponent, ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableWithoutFeedbackProps, ViewStyle } from 'react-native';

import styles from './styles';

interface Props {
  children?: ReactNode | string;
  backgroundColor?: string;
  borderRadius?: number;
  disabled?: boolean;
  width?: number | string;
  height?: number | string;
  type?: string;
  disableColor?: string;
  style?: number | StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  textColor?: string;
  fontSize?: number;
  textStyle?: number | StyleProp<TextStyle>;
  fontWeight?: string;
}

export default class Button extends PureComponent<Props & TouchableWithoutFeedbackProps> {
  static defaultProps = {
    borderRadius: 2,
    backgroundColor: '#6100ED',
    disabled: false,
    height: 50,
    width: 'auto',
    type: 'primary',
    disableColor: '#ececec',
    style: {},
    textColor: '#fff',
    fontSize: 14,
    fontWeight: '400',
    textStyle: {},
  };

  render() {
    let baseContainer = {};
    let baseText = {};
    const {
      backgroundColor,
      disableColor,
      borderRadius,
      disabled,
      width,
      height,
      type,
      style,
      children,
      textColor,
      textStyle,
      fontSize,
      fontWeight,
      onPress,
      ...props
    } = this.props;

    if (type === 'primary') {
      if (backgroundColor) {
        baseContainer = { backgroundColor, ...baseContainer };
      }
    } else if (type === 'ghost') {
      if (backgroundColor) {
        baseContainer = {
          backgroundColor: '#fff',
          borderColor: backgroundColor,
          borderWidth: StyleSheet.hairlineWidth,
          ...baseContainer,
        };
      }
    }

    if (borderRadius && borderRadius > 0) {
      baseContainer = { borderRadius, ...baseContainer };
    }
    if ((height && height > 0) || height === '100%') {
      baseContainer = { height, ...baseContainer };
    }
    if ((width && width > 0) || width === '100%') {
      baseContainer = { width, ...baseContainer };
    }

    if (type === 'ghost') {
      baseText = { color: backgroundColor, ...baseText };
    } else if (textColor) {
      baseText = { color: textColor, ...baseText };
    }
    if (fontSize) {
      baseText = { fontSize, ...baseText };
    }
    if (fontWeight) {
      baseText = { fontWeight, ...baseText };
    }

    let mergedContainer = StyleSheet.flatten([baseContainer, style]);
    let activeOpacity = 0.7;
    let onClick = onPress;
    if (disabled) {
      mergedContainer = StyleSheet.flatten([mergedContainer, { backgroundColor: disableColor }]);
      activeOpacity = 1;
      onClick = undefined;
    }
    const mergedText = StyleSheet.flatten([baseText, textStyle]);

    let childrenNode: ReactNode = (
      <Text allowFontScaling={false} style={mergedText}>
        {children}
      </Text>
    );
    if (typeof children === 'object') {
      childrenNode = children;
    }
    const finalStyle = StyleSheet.flatten([styles.container, mergedContainer]);
    return (
      <TouchableOpacity touchSoundDisabled={false} activeOpacity={activeOpacity} style={finalStyle} onPress={onClick} {...props}>
        {childrenNode}
      </TouchableOpacity>
    );
  }
}
