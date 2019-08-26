import React from 'react';
import { FlatList as FL, StyleSheet } from 'react-native';

import styles from './styles';

export default class FlatList extends FL<any> {
  render() {
    const { style, ...props } = this.props;
    const mergedStyle = StyleSheet.flatten([styles.container, style]);
    return <FL keyboardShouldPersistTaps={'handled'} style={mergedStyle} {...props} />;
  }
}
