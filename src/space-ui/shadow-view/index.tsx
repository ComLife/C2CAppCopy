import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import baseStyles from './styles';

interface State {}

export default class ShadowView extends PureComponent<TouchableOpacityProps, State> {
  public render() {
    const { children, style, ...props } = this.props;
    if (!children) {
      return null;
    }
    const mergedStyle = StyleSheet.flatten([baseStyles.container, style]);
    return (
      <TouchableOpacity activeOpacity={1} style={mergedStyle} {...props}>
        {children}
      </TouchableOpacity>
    );
  }
}
