import { ISignInMutationInput } from '../../services/graphql/mutations/signIn';
import { IErrors, IUser } from '../../services/graphql/types';
import { persistSignIn } from '../../services/store/Authentication/actionCreators';

export interface ISignInProps {
  isSignedIn: boolean;
  persistSignIn: typeof persistSignIn;
}

export interface ISignInState {
  auth: ISignInMutationInput;
  didSubmit: boolean;
  errors: IErrors;
  user?: IUser;
  validations: {
    [P in keyof ISignInMutationInput]: boolean;
  };
}
