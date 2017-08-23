import * as decode from 'jwt-decode';

import { IUser } from '../../api/users/types';
import { getToken } from '../../utils/authentication';
import { IApplicationState, ILoadableState } from '../types';

export const getSignedInUser = (state: IApplicationState): ILoadableState<IUser> => {
  if (state.authentication.isSignedIn) {
    return state.users.users[decode(getToken()).uid];
  }

  return {
    errors: {},
    loaded: false,
    value: null,
  }
};
