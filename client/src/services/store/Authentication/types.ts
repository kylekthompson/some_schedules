import * as decode from 'jwt-decode';

import { getToken } from '../../utils/authentication';

export const initialState: IAuthenticationState = {
  isSignedIn: !!getToken() && Date.now() / 1000 < decode(getToken()).exp,
};

export interface IAuthenticationState {
  isSignedIn: boolean;
}
