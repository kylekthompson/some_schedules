import { ICreatedUser } from '../../api/users/types';
import * as actionTypes from './actionTypes';
import { IUsersState, initialState } from './model';

export default (state: IUsersState = initialState, { type, payload }) => {
  let newState: IUsersState;
  let user: ICreatedUser;

  switch (type) {
    case actionTypes.RECEIVE_USER_SIGN_UP_SUCCESS:
      user = { ...(payload.value as ICreatedUser) };
      delete user.token;

      newState = {
        ...state,
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

    default:
      return state;
  }
};
