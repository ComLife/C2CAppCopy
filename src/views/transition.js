import React, { Fragment } from "react";
import { SafeAreaView, StyleSheet, View, StatusBar, Text } from "react-native";

const Transation = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <View style={styles.container}>
        <Text>Transation</Text>
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

export default Transation;
