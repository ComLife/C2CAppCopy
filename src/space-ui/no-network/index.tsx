import * as React from 'react';
import { GestureResponderEvent, Image, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  style?: StyleProp<TextStyle>;
  descText?: string;
  buttonText?: string;
  onReloadPress?: (event: GestureResponderEvent) => void;
}

export default class NoNetwork extends React.PureComponent<Props> {
  static defaultProps = {
    descText: '您的网络好像不太给力，请稍后再试',
    buttonText: '重新加载',
  };

  onPress = (e: GestureResponderEvent) => {
    const { onReloadPress } = this.props;
    onReloadPress && onReloadPress(e);
  };

  render() {
    const { style, descText, buttonText } = this.props;
    const mergedContainer = StyleSheet.flatten([styles.container, style]);
    return (
      <View style={mergedContainer}>
        <Image style={styles.icon} source={require('./assets/no_network.png')} />
        <Text allowFontScaling={false} numberOfLines={2} style={styles.descText}>
          {descText}
        </Text>
        <TouchableOpacity onPress={this.onPress} style={styles.button}>
          <Text allowFontScaling={false} numberOfLines={1} style={styles.buttonText}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
