import React, { PureComponent } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  backgroundColor: string;
  height: number;
}

export default class DivisorLine extends PureComponent<Props> {
  static defaultProps = {
    backgroundColor: '#707070',
    height: StyleSheet.hairlineWidth as number,
  };

  render() {
    const { style, backgroundColor, height } = this.props;
    const mergedStyle = StyleSheet.flatten([style, { backgroundColor }, { height }]);
    return <View style={mergedStyle} />;
  }
}
