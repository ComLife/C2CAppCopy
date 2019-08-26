import * as React from 'react';
import { Image, StyleProp, StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import RedBadge from '../red-badge/index';
import styles from './styles';

interface Props {
  count: number;
  style?: StyleProp<TextStyle>;
  testIDs?: string[];
}

export default class ShoppingCar extends React.PureComponent<Props> {
  static defaultProps = {
    count: 0,
  };

  onPress = () => {};

  render() {
    const { style, count, testIDs } = this.props;
    const mergedContainer = StyleSheet.flatten([styles.container, style]);
    return (
      <TouchableOpacity style={mergedContainer} activeOpacity={0.7} onPress={this.onPress} testID={testIDs && testIDs[0]}>
        <Image style={styles.icon} source={require('./assets/shopping_car.png')} />
        <RedBadge style={styles.num} num={count} />
      </TouchableOpacity>
    );
  }
}
