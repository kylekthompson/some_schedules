import { ICreatedUser, IUser } from '../../api/users/types';
import * as actionTypes from './actionTypes';
import { initialState, IUsersState } from './types';

export default (state: IUsersState = initialState, { type, payload }) => {
  let newState: IUsersState;
  let createdUser: ICreatedUser;
  let user: IUser;

  switch (type) {
    case actionTypes.RECEIVE_USER_BY_ID_FAILURE:
      newState = {
        ...state,
        users: {
          ...state.users,
          [payload.id]: {
            ...state.users[payload.id],
            errors: payload.errors,
            loaded: true,
            value: null,
          },
        },
      };

      return newState;

    case actionTypes.RECEIVE_USER_BY_ID_SUCCESS:
      user = { ...(payload.value as IUser) };

      newState = {
        ...state,
        users: {
          ...state.users,
          [payload.id]: {
            ...state.users[payload.id],
            errors: {},
            loaded: true,
            value: user,
          },
        },
      };

      return newState;

    case actionTypes.REQUEST_USER_BY_ID:
      newState = {
        ...state,
        users: {
          ...state.users,
          [payload.id]: {
            errors: {},
            loaded: false,
            value: null,
          },
        },
      };

      return newState;

    case actionTypes.RECEIVE_USER_SIGN_UP_FAILURE:
      newState = {
        ...state,
        userCreation: {
          ...state.userCreation,
          errors: payload.errors,
          loaded: true,
          value: null,
        },
      };

      return newState;

    case actionTypes.RECEIVE_USER_SIGN_UP_SUCCESS:
      createdUser = { ...(payload.value as ICreatedUser) };
      delete createdUser.token;
      user = { ...(createdUser as IUser) };

      newState = {
        ...state,
        userCreation: {
          ...state.userCreation,
          errors: {},
          loaded: true,
          value: createdUser,
        },
        users: {
          ...state.users,
          [user.id]: {
            errors: {},
            loaded: true,
            value: user,
          },
        },
      };

      return newState;

    case actionTypes.REQUEST_USER_SIGN_UP:
      newState = {
        ...state,
        userCreation: {
          ...state.userCreation,
          errors: {},
          loaded: false,
          value: null,
        },
      };

      return newState;

    default:
      return state;
  }
};
