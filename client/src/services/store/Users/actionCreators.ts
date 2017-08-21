import { IAPIResponse } from '../../api/shared/types';
import { getUser, postSignUp } from '../../api/users';
import {
  ICreatedUser,
  IUser,
  IUserForCreation
} from '../../api/users/types';
import { setToken } from '../../utils/authentication';
import { IThunkAction } from '../types';
import * as actionTypes from './actionTypes';

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

export const requestUserById = (id: number): IThunkAction => async (dispatch, _getState) => {
  dispatch({ type: actionTypes.REQUEST_USER_BY_ID, payload: { id } });

  try {
    const userResponse: IAPIResponse<IUser> = await getUser(id);

    if (userResponse.status < 400) {
      dispatch({ type: actionTypes.RECEIVE_USER_BY_ID_SUCCESS, payload: { ...userResponse, id } });
    } else {
      dispatch({ type: actionTypes.RECEIVE_USER_BY_ID_FAILURE, payload: { ...userResponse, id } });
    }
  } catch (e) {
    dispatch({
      payload: {
        errors: {
          '': ['An unexpected error occurred.'],
        },
        id,
        status: 500,
      },
      type: actionTypes.RECEIVE_USER_BY_ID_FAILURE,
    });
  }
};
