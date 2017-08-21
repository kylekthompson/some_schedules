import { ICreatedUser, IUserForCreation } from '../../services/api/users/types';
import { requestSignUp } from '../../services/store/Users/actionCreators';
import { ILoadableState } from '../../services/store/types';

export interface IUserSignUpProps {
  isSignedIn: boolean;
  requestSignUp: typeof requestSignUp;
  shouldRedirectWhenSignedIn?: boolean;
  userCreation: ILoadableState<ICreatedUser>;
}

export interface IUserSignUpState {
  didSubmit: boolean;
  user: IUserForCreation;
  validations: {
    [P in keyof IUserForCreation]: boolean;
  };
}
