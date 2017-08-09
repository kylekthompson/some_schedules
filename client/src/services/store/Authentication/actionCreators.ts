import { postSignIn } from '../../api/authentication';
import { deleteToken, getToken, isTokenExpired, setToken } from '../../utils/authentication';
import { IThunkAction } from '../types';
import * as actionTypes from './actionTypes';

export const requestSignIn = (email: string, password: string): IThunkAction => async (dispatch, getState) => {
  if (!getState().authentication.isSignedIn) {
    dispatch({ type: actionTypes.SIGNIN_REQUEST });

    try {
      const token = getToken();
      if (token === null || isTokenExpired(token)) {
        const authentication = await postSignIn(email, password);
        setToken(authentication.token);
      }

      dispatch({ type: actionTypes.SIGNIN_SUCCESS });
    } catch (error) {
      dispatch({ type: actionTypes.SIGNIN_FAILURE, payload: { error } });
    }
  }
};

export const requestSignOut = (): IThunkAction => (dispatch) => {
  dispatch({ type: actionTypes.SIGNOUT_REQUEST });
  deleteToken();
  dispatch({ type: actionTypes.SIGNOUT_SUCCESS });
};
