import React, { PureComponent } from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import styles from './styles';

interface Props {
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

export default class Indicator extends PureComponent<Props> {
  static defaultProps = {
    style: {},
  };

  render() {
    const { style, ...props } = this.props;
    const mergedStyle = StyleSheet.flatten([styles.container, style]);
    return <ActivityIndicator style={mergedStyle} {...props} />;
  }
}
