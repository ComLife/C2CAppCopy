import * as types from "../action-types";

export const loginAction = payload => {
  return { type: types.LOGIN, payload };
};
