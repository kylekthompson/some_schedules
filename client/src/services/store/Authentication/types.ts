import { IAuthenticationToken } from '../../api/authentication/types';
import { getToken } from '../../utils/authentication';
import { ILoadableState } from '../types';

export const initialState: IAuthenticationState = {
  isSignedIn: !!getToken(),
  signIn: {
    errors: {},
    loaded: false,
    value: null,
  },
};

export interface IAuthenticationState {
  isSignedIn: boolean;
  signIn: ILoadableState<IAuthenticationToken>;
}
