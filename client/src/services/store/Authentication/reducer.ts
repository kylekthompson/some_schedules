import * as usersActionTypes from '../Users/actionTypes';
import * as actionTypes from './actionTypes';
import { IAuthenticationState, initialState } from './types';

export default (state: IAuthenticationState = initialState, { type }) => {
  let newState: IAuthenticationState;

  switch (type) {
    case actionTypes.PERSIST_USER_SIGN_IN:
      newState = {
        ...state,
        isSignedIn: true,
      };

      return newState;

    case usersActionTypes.RECEIVE_USER_SIGN_UP_SUCCESS:
      newState = {
        ...state,
        isSignedIn: true,
      };

      return newState;

    case actionTypes.REQUEST_USER_SIGN_OUT:
      newState = {
        ...state,
        isSignedIn: false,
      };

      return newState;

    default:
      return state;
  }
};
