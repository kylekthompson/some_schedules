import { ICreatedUser, IErrors } from '../../api/types';

export const initialState: IAuthenticationState = {
  isSignedIn: false,
  signUp: {
    errors: {},
    loading: false,
  },
};

export interface IAuthenticationState {
  isSignedIn: boolean;
  signUp: {
    errors: IErrors;
    loading: boolean;
    user?: ICreatedUser;
  };
}
