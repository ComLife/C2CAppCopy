import * as React from 'react';
import { ImageBackground, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import styles from './styles';

interface Props {
  style?: StyleProp<TextStyle>;
  num: number;
}

export default class RedBadge extends React.PureComponent<Props> {
  static defaultProps = {
    number: 0,
  };

  render() {
    const { style, num } = this.props;
    const mergedContainer = StyleSheet.flatten([styles.icon, style]);
    return (
      <ImageBackground style={mergedContainer} source={require('./assets/red_badge.png')}>
        <Text allowFontScaling={false} style={styles.text}>
          {num}
        </Text>
      </ImageBackground>
    );
  }
}
