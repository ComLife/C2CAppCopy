import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView as SAV, SafeAreaViewProps } from 'react-navigation';

import baseStyles from './styles';

interface State {}

export default class SafeAreaView extends PureComponent<SafeAreaViewProps, State> {
  public render() {
    const { children, style, ...props } = this.props;
    if (!children) {
      return null;
    }
    const mergedStyle = StyleSheet.flatten([baseStyles.container, style]);
    return (
      <SAV style={mergedStyle} forceInset={{ top: 'always', bottom: 'always' }} {...props}>
        {children}
      </SAV>
    );
  }
}
