import * as actionTypes from './actionTypes';
import { IAuthenticationState, initialState } from './model';

export default (state: IAuthenticationState = initialState, { type, payload }) => {
  let newState: IAuthenticationState;

  switch (type) {
    case actionTypes.RECEIVE_USER_SIGN_UP_FAILURE:
      newState = {
        ...state,
        signUp: {
          ...state.signUp,
          errors: payload.errors,
          loading: false,
        },
      };

      return newState;

    case actionTypes.RECEIVE_USER_SIGN_UP_SUCCESS:
      newState = {
        ...state,
        isSignedIn: true,
        signUp: {
          ...state.signUp,
          loading: false,
          user: payload.value,
        },
      };

      return newState;

    case actionTypes.REQUEST_USER_SIGN_UP:
      newState = {
        ...state,
        signUp: {
          ...state.signUp,
          loading: true,
        },
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
