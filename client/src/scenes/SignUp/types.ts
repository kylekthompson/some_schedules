import { ICreatedUser, IErrors, IUserForCreation } from '../../services/api/types';

export interface ISignUpProps {
  errors: IErrors;
  isSignedIn: boolean;
  loading: boolean;
  user?: ICreatedUser;
  requestSignUp: (user: IUserForCreation) => void;
}

export interface ISignUpState {
  user: IUserForCreation;
  validations: {
    [P in keyof IUserForCreation]: boolean;
  };
}
