import React, { PureComponent, ReactNode } from 'react';
import { GestureResponderEvent, Image, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import styles from './styles';

interface Props {
  title: string;
  activeOpacity?: number;
  arrow?: boolean;
  disabled?: boolean;
  divisorLine?: boolean;
  extra?: ReactNode | string;
  height?: number;
  testIDs?: string[];
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  extraStyle?: StyleProp<TextStyle>;
  multipleLine?: boolean;
  wrap?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export default class ListItem extends PureComponent<Props & TouchableOpacityProps> {
  static defaultProps = {
    divisorLine: true,
    height: 40,
  };

  render() {
    const { activeOpacity, arrow, divisorLine, disabled, extra, extraStyle, height, style, testIDs, onPress, title, titleStyle } = this.props;
    const mergedContainer = StyleSheet.flatten([styles.container, style, { height }, divisorLine && styles.divisorLine]);
    const mergedTitle = StyleSheet.flatten([styles.titleText, titleStyle]);
    const mergedExtra = StyleSheet.flatten([styles.extraText, extraStyle]);
    let defaultActiveOpacity = activeOpacity;
    let children: ReactNode = (
      <Text allowFontScaling={false} style={mergedTitle}>
        {title}
      </Text>
    );
    if (arrow) {
      defaultActiveOpacity = activeOpacity || 0.7;
      const arrowTextStyle = [styles.arrow, { marginLeft: 6 }];
      children = (
        <View style={styles.viewWrapper}>
          <Text allowFontScaling={false} style={mergedTitle}>
            {title}
          </Text>
          {extra && typeof extra === 'string' ? (
            <View style={styles.viewWrapper}>
              <Text allowFontScaling={false} style={mergedExtra}>
                {extra}
              </Text>
              <Image source={require('./assets/arrow.png')} style={arrowTextStyle} />
            </View>
          ) : (
            <Image source={require('./assets/arrow.png')} style={styles.arrow} />
          )}
        </View>
      );
    } else if (extra) {
      if (typeof extra === 'string') {
        children = (
          <View style={styles.viewWrapper}>
            <Text allowFontScaling={false} style={mergedTitle}>
              {title}
            </Text>
            <Text allowFontScaling={false} style={mergedExtra}>
              {extra}
            </Text>
          </View>
        );
      } else {
        children = (
          <View style={styles.viewWrapper}>
            <Text allowFontScaling={false} style={mergedTitle}>
              {title}
            </Text>
            {extra}
          </View>
        );
      }
    }
    return (
      <TouchableOpacity disabled={disabled} activeOpacity={defaultActiveOpacity || 1} style={mergedContainer} testID={testIDs && testIDs[0]} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
}
