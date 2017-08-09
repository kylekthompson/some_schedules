import * as actionTypes from './actionTypes';
import { IAuthenticationState } from './model';

const initialState: IAuthenticationState = {
  isSignedIn: false,
};

export default (state: IAuthenticationState = initialState, { type, payload }) => {
  let newState: IAuthenticationState;

  switch (type) {
    case actionTypes.SIGNIN_FAILURE:
      newState = {
        ...state,
        error: payload.error,
        isSignedIn: false,
      };

      return newState;

    case actionTypes.SIGNIN_SUCCESS:
      newState = {
        ...state,
        error: undefined,
        isSignedIn: true,
      };

      return newState;

    case actionTypes.SIGNOUT_SUCCESS:
      newState = {
        ...state,
        error: undefined,
        isSignedIn: false,
      };

      return newState;

    default:
      return state;
  }
};
