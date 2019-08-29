/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import AppNavigator from "./routes/app-navigator";
import { Toast } from "./components/toast";

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast />
    </Provider>
  );
};

export default App;
