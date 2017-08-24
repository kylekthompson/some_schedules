import * as decode from 'jwt-decode';

import { getToken } from '../../utils/authentication';
import { ILoadingState, LoadingState } from '../types';

export const initialState: IAuthenticationState = {
  isSignedIn: !!getToken() && Date.now() / 1000 < decode(getToken()).exp,
  requestSignInLoadingState: LoadingState.notStarted(),
};

export interface IAuthenticationState {
  isSignedIn: boolean;
  requestSignInLoadingState: ILoadingState;
}
