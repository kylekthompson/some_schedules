import { ICreatedUser } from '../../api/users/types';
import * as usersActionTypes from '../Users/actionTypes';
import * as actionTypes from './actionTypes';
import { IAuthenticationState, initialState } from './model';

export default (state: IAuthenticationState = initialState, { type, payload }) => {
  let newState: IAuthenticationState;

  switch (type) {
    case actionTypes.RECEIVE_USER_SIGN_IN_FAILURE:
      newState = {
        ...state,
        isSignedIn: false,
        signIn: {
          ...state.signIn,
          errors: payload.errors,
          loaded: true,
          value: null,
        },
      };

      return newState;

    case actionTypes.RECEIVE_USER_SIGN_IN_SUCCESS:
      newState = {
        ...state,
        isSignedIn: true,
        signIn: {
          ...state.signIn,
          errors: {},
          loaded: true,
          value: payload.value,
        },
      };

      return newState;

    case actionTypes.REQUEST_USER_SIGN_IN:
      newState = {
        ...state,
        signIn: {
          ...state.signIn,
          errors: {},
          loaded: false,
          value: null,
        },
      };

      return newState;

    case usersActionTypes.RECEIVE_USER_SIGN_UP_FAILURE:
      newState = {
        ...state,
        isSignedIn: false,
        signUp: {
          ...state.signUp,
          errors: payload.errors,
          loaded: true,
          value: null,
        },
      };

      return newState;

    case usersActionTypes.RECEIVE_USER_SIGN_UP_SUCCESS:
      const user = (payload.value as ICreatedUser);

      newState = {
        ...state,
        isSignedIn: true,
        signUp: {
          ...state.signUp,
          errors: {},
          loaded: true,
          value: user,
        },
      };

      return newState;

    case usersActionTypes.REQUEST_USER_SIGN_UP:
      newState = {
        ...state,
        signUp: {
          ...state.signUp,
          errors: {},
          loaded: false,
          value: null,
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
