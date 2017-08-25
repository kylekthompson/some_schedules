import { IAuthenticationCredentials } from '../../services/api/authentication/types';
import { requestSignIn } from '../../services/store/Authentication/actionCreators';
import { ILoadingState } from '../../services/store/types';

export interface ISignInProps {
  isSignedIn: boolean;
  requestSignIn: typeof requestSignIn;
  requestSignInLoadingState: ILoadingState;
}

export interface ISignInState {
  didSubmit: boolean;
  auth: IAuthenticationCredentials;
  validations: {
    [P in keyof IAuthenticationCredentials]: boolean;
  };
}
