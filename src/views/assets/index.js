import React, { memo, Fragment } from "react";
import { SafeAreaView, StyleSheet, View, StatusBar, Text } from "react-native";

const Assets = memo(props => {
  console.log("Assets = ", props);
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <Text onPress={() => props.navigation.navigate("Login")}>登录</Text>
      <View style={styles.container}>
        <Text>Assets</Text>
      </View>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Assets;
