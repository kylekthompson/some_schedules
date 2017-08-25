import { IUser } from '../../api/users/types';
import { LoadingState } from '../types';
import * as actionTypes from './actionTypes';
import { initialState, IUsersState } from './types';

export default (state: IUsersState = initialState, { type, payload }) => {
  let newState: IUsersState;
  let user: IUser;

  switch (type) {
    case actionTypes.RECEIVE_USER_BY_ID_FAILURE:
      newState = {
        ...state,
        requestUserByIdLoadingState: LoadingState.failure(payload.errors),
      };

      return newState;

    case actionTypes.RECEIVE_USER_BY_ID_SUCCESS:
      user = (payload.value as IUser);

      newState = {
        ...state,
        requestUserByIdLoadingState: LoadingState.success(),
        users: {
          ...state.users,
          [payload.id]: user,
        },
      };

      return newState;

    case actionTypes.REQUEST_USER_BY_ID:
      newState = {
        ...state,
        requestUserByIdLoadingState: LoadingState.loading(),
      };

      return newState;

    case actionTypes.RECEIVE_USER_SIGN_UP_FAILURE:
      newState = {
        ...state,
        requestSignUpLoadingState: LoadingState.failure(payload.errors),
      };

      return newState;

    case actionTypes.RECEIVE_USER_SIGN_UP_SUCCESS:
      user = (payload.value as IUser);

      newState = {
        ...state,
        requestSignUpLoadingState: LoadingState.success(),
        users: {
          ...state.users,
          [user.id]: user,
        },
      };

      return newState;

    case actionTypes.REQUEST_USER_SIGN_UP:
      newState = {
        ...state,
        requestSignUpLoadingState: LoadingState.loading(),
      };

      return newState;

    default:
      return state;
  }
};
