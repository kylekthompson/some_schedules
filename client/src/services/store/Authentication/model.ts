import { ICreatedUser } from '../../api/authentication/types';
import { getToken } from '../../utils/authentication';
import { ILoadableState } from '../types';

export const initialState: IAuthenticationState = {
  isSignedIn: !!getToken(),
  signUp: {
    errors: {},
    loaded: false,
    value: null,
  },
};

export interface IAuthenticationState {
  isSignedIn: boolean;
  signUp: ILoadableState<ICreatedUser>;
}
