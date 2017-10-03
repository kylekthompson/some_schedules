import { IUserForCreation } from '../../services/api/users/types';
import { IErrors } from '../../services/graphql/types';
import { persistSignIn } from '../../services/store/Authentication/actionCreators';

export interface IUserSignUpProps {
  isSignedIn: boolean;
  onSignUpSuccess: () => void;
  persistSignIn: typeof persistSignIn;
  shouldRedirectWhenSignedIn?: boolean;
}

export interface IUserSignUpState {
  didSubmit: boolean;
  errors: IErrors;
  user: IUserForCreation;
  validations: {
    [P in keyof IUserForCreation]: boolean;
  };
}
