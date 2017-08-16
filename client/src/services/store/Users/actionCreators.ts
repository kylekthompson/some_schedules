import { postSignUp } from '../../api/users';
import {
  ICreatedUser,
  IUserForCreation
} from '../../api/users/types';
import { IAPIResponse } from '../../api/shared/types';
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
