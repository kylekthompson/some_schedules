import { postSignIn, postSignUp } from '../../api/authentication';
import {
  IAuthenticationCredentials,
  IAuthenticationToken,
  ICreatedUser,
  IUserForCreation
} from '../../api/authentication/types';
import { IAPIResponse } from '../../api/shared/types';
import { deleteToken, setToken } from '../../utils/authentication';
import { IThunkAction } from '../types';
import * as actionTypes from './actionTypes';

export const requestSignIn = (auth: IAuthenticationCredentials): IThunkAction => async (dispatch, _getState) => {
  dispatch({ type: actionTypes.REQUEST_USER_SIGN_IN });

  try {
    const signInResponse: IAPIResponse<IAuthenticationToken> = await postSignIn(auth);

    if (signInResponse.status < 400) {
      setToken((signInResponse.value as IAuthenticationToken).token);
      dispatch({ type: actionTypes.RECEIVE_USER_SIGN_IN_SUCCESS, payload: { ...signInResponse } });
    } else if (signInResponse.status === 404) {
      dispatch({
        payload: {
          errors: {
            email: ['Email may be incorrect or may not exist.'],
            password: ['Password may be incorrect'],
          },
          status: 404,
        },
        type: actionTypes.RECEIVE_USER_SIGN_IN_FAILURE,
      });
    } else {
      dispatch({ type: actionTypes.RECEIVE_USER_SIGN_IN_FAILURE, payload: { ...signInResponse } });
    }
  } catch (e) {
    dispatch({
      payload: {
        errors: {
          '': ['An unexpected error occurred.'],
        },
        status: 500,
      },
      type: actionTypes.RECEIVE_USER_SIGN_IN_FAILURE,
    });
  }
};

export const requestSignOut = () => {
  deleteToken();
  return {
    type: actionTypes.REQUEST_USER_SIGN_OUT,
  };
};

export const requestSignUp = (user: IUserForCreation): IThunkAction => async (dispatch, _getState) => {
  dispatch({ type: actionTypes.REQUEST_USER_SIGN_UP });

  try {
    const userResponse: IAPIResponse<ICreatedUser> = await postSignUp(user);

    if (userResponse.status < 400) {
      setToken((userResponse.value as ICreatedUser).token);
      dispatch({ type: actionTypes.RECEIVE_USER_SIGN_UP_SUCCESS, payload: { ...userResponse } });
    } else {
      dispatch({ type: actionTypes.RECEIVE_USER_SIGN_UP_FAILURE, payload: { ...userResponse } });
    }
  } catch (e) {
    dispatch({
      payload: {
        errors: {
          '': ['An unexpected error occurred.'],
        },
        status: 500,
      },
      type: actionTypes.RECEIVE_USER_SIGN_UP_FAILURE,
    });
  }
};
