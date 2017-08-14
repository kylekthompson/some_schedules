import { ICreatedUser, IUserForCreation } from '../../services/api/authentication/types';
import { requestSignUp } from '../../services/store/Authentication/actionCreators';
import { ILoadableState } from '../../services/store/types';

export interface ISignUpProps {
  isSignedIn: boolean;
  requestSignUp: typeof requestSignUp;
  signUp: ILoadableState<ICreatedUser>;
}

export interface ISignUpState {
  didSubmit: boolean;
  user: IUserForCreation;
  validations: {
    [P in keyof IUserForCreation]: boolean;
  };
}
