import * as types from '../action-types';

export function userInfo(state = {}, action) {
  console.log('userInfo action==', action);
  const {type, payload = {}} = action;
  switch (type) {
    case types.LOGIN:
      return {...state, ...payload};
    default:
      return state;
  }
}
