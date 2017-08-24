import * as decode from 'jwt-decode';

import { IUser } from '../../api/users/types';
import { getToken } from '../../utils/authentication';
import { IApplicationState } from '../types';

export const getSignedInUser = (state: IApplicationState): IUser | null => {
  if (state.authentication.isSignedIn) {
    return state.users.users[decode(getToken()).uid];
  }

  return null;
};
