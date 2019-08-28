import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunkMiddleware];

if (__DEV__) {
  const logger = require("redux-logger").createLogger({
    collapsed: true,
    diff: true,
    duration: false
  });
  middleware.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));
