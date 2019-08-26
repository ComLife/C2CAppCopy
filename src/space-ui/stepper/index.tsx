import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  style?: StyleProp<TextStyle>;
  testIDs?: string[];
  iconSize?: number;
  defaultValue?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export default class Stepper extends React.PureComponent<Props> {
  state = {
    value: this.props.defaultValue || 0,
    step: this.props.step || 1,
  };

  static defaultProps = {
    iconSize: 23,
  };

  onPress = (type: string) => () => {
    const { value, step } = this.state;
    const { onChange } = this.props;
    if (type === '+') {
      this.setState({ value: value + step });
    } else {
      const result = value - step;
      this.setState({ value: result > 0 ? result : 0 });
    }
    setTimeout(() => {
      onChange && onChange(this.state.value);
    }, 0);
  };

  render() {
    const { value } = this.state;
    const { style, testIDs } = this.props;
    const mergedContainer = StyleSheet.flatten([styles.container, style]);
    return (
      <View style={mergedContainer} testID={testIDs && testIDs[0]}>
        <TouchableOpacity activeOpacity={0.7} onPress={this.onPress('-')} />
        <Text allowFontScaling={false}>{value}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={this.onPress('+')} />
      </View>
    );
  }
}
