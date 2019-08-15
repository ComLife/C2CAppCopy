import React, { Fragment } from "react";
import { SafeAreaView, StyleSheet, View, StatusBar, Text } from "react-native";

const Assets = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <View style={styles.container}>
        <Text>Assets</Text>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Assets;
