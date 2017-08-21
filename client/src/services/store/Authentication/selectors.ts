import * as decode from 'jwt-decode';

import { getToken } from '../../utils/authentication';
import { IApplicationState } from '../types';

export const getUserIdFromToken = (state: IApplicationState): number =>
  state.authentication.isSignedIn && decode(getToken()).uid;
