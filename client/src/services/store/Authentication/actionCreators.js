import { deleteToken, setToken } from '../../utils/authentication';
import * as actionTypes from './actionTypes';

export const persistSignIn = (token: string) => {
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
