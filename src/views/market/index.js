import React, {Fragment, memo} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

const Market = memo(props => {
  console.log('Market = ', props);
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <View style={styles.container}>
        <Text>Market</Text>
      </View>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Market;
