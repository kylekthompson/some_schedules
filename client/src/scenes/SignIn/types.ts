import { IAuthenticationCredentials, IAuthenticationToken } from '../../services/api/authentication/types';
import { requestSignIn } from '../../services/store/Authentication/actionCreators';
import { ILoadableState } from '../../services/store/types';

export interface ISignInProps {
  isSignedIn: boolean;
  requestSignIn: typeof requestSignIn;
  signIn: ILoadableState<IAuthenticationToken>;
}

export interface ISignInState {
  didSubmit: boolean;
  auth: IAuthenticationCredentials;
  validations: {
    [P in keyof IAuthenticationCredentials]: boolean;
  };
}
