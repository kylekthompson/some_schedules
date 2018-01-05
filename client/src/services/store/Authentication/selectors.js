import decode from 'jwt-decode';

import { getToken } from 'services/utils/authentication';

export const getUserIdFromToken = (state) =>
  state.authentication.isSignedIn && decode(getToken()).uid;
