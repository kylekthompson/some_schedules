import { IAuthenticationCredentials } from '../../services/api/authentication/types';
import { persistSignIn } from '../../services/store/Authentication/actionCreators';
import { addFlash } from '../../services/store/Flashes/actionCreators';

export interface ISignInProps {
  addFlash: typeof addFlash;
  isSignedIn: boolean;
  persistSignIn: typeof persistSignIn;
}

export interface ISignInState {
  didSubmit: boolean;
  auth: IAuthenticationCredentials;
  validations: {
    [P in keyof IAuthenticationCredentials]: boolean;
  };
}
