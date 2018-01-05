import { deleteToken, setToken } from 'services/utils/authentication';

import * as actionTypes from 'services/store/Authentication/actionTypes';

export const persistSignIn = (token) => {
  setToken(token);
  return {
    type: actionTypes.PERSIST_USER_SIGN_IN,
  };
};

export const requestSignOut = () => {
  deleteToken();
  return {
    type: actionTypes.REQUEST_USER_SIGN_OUT,
  };
};
