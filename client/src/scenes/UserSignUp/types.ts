import { IUserForCreation } from '../../services/api/users/types';
import { persistSignIn } from '../../services/store/Authentication/actionCreators';

export interface IUserSignUpProps {
  isSignedIn: boolean;
  onSignUpSuccess: () => void;
  persistSignIn: typeof persistSignIn;
  shouldRedirectWhenSignedIn?: boolean;
}

export interface IUserSignUpState {
  didSubmit: boolean;
  user: IUserForCreation;
  validations: {
    [P in keyof IUserForCreation]: boolean;
  };
}
