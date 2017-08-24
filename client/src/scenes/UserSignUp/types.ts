import { IUserForCreation } from '../../services/api/users/types';
import { requestSignUp } from '../../services/store/Users/actionCreators';
import { ILoadingState } from '../../services/store/types';

export interface IUserSignUpProps {
  isSignedIn: boolean;
  requestSignUp: typeof requestSignUp;
  requestSignUpLoadingState: ILoadingState;
  shouldRedirectWhenSignedIn?: boolean;
}

export interface IUserSignUpState {
  didSubmit: boolean;
  user: IUserForCreation;
  validations: {
    [P in keyof IUserForCreation]: boolean;
  };
}
