import { postSignUp } from '../../api/authentication';
import { IAPIResponse, ICreatedUser, IUserForCreation } from '../../api/types';
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
    // tslint:disable-next-line:no-console
    console.error(e);
  }
};
