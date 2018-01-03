import * as decode from 'jwt-decode';

import { getToken } from '../../utils/authentication';
import * as actionTypes from './actionTypes';

const initialState = {
  isSignedIn: Boolean(getToken()) && Date.now() / 1000 < decode(getToken()).exp,
};

export default (state = initialState, { type }) => {
  let newState;

  switch (type) {
    case actionTypes.PERSIST_USER_SIGN_IN:
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
