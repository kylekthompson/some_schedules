import { ISignInMutationInput } from '../../services/graphql/mutations/signIn';
import { persistSignIn } from '../../services/store/Authentication/actionCreators';
import { addFlash } from '../../services/store/Flashes/actionCreators';

export interface ISignInProps {
  addFlash: typeof addFlash;
  isSignedIn: boolean;
  persistSignIn: typeof persistSignIn;
}

export interface ISignInState {
  didSubmit: boolean;
  auth: ISignInMutationInput;
  validations: {
    [P in keyof ISignInMutationInput]: boolean;
  };
}
