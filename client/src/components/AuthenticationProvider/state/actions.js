import * as authentication from 'models/authentication';

import { SIGN_IN, SIGN_OUT } from 'components/AuthenticationProvider/state/types';

export const signIn = (token, setToken = authentication.setToken) => {
  setToken(token);

  return {
    type: SIGN_IN,
  };
};

export const signOut = (deleteToken = authentication.deleteToken) => {
  deleteToken();

  return {
    type: SIGN_OUT,
  };
};
