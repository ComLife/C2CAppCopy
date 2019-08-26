import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import styles from './styles';

export enum Colors {
  Red = '#F15646',
  Black = '#333333',
}

interface Props {
  style?: StyleProp<TextStyle>;
  currency?: string;
  size?: number;
  color?: Colors | string;
  price: number;
}

export default class Price extends React.PureComponent<Props> {
  static defaultProps = {
    currency: '$',
    color: Colors.Red,
  };

  render() {
    const { style, currency, price, size, color } = this.props;
    let extraStyle = {};
    if (size) {
      extraStyle = { ...extraStyle, fontSize: size };
    }
    if (color) {
      extraStyle = { ...extraStyle, color: `${color}` };
    }
    const mergedContainer = StyleSheet.flatten([styles.container, style, extraStyle]);
    return (
      <Text allowFontScaling={false} style={mergedContainer}>
        <Text>{currency}</Text>
        <Text>{price}</Text>
      </Text>
    );
  }
}
