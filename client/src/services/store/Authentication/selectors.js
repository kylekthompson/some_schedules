import decode from 'jwt-decode';

import { getToken } from '../../utils/authentication';

export const getUserIdFromToken = (state) =>
  state.authentication.isSignedIn && decode(getToken()).uid;
