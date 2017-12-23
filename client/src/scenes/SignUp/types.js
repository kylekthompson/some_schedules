import { ICompanyForCreation } from '../../services/api/companies/types';
import { IUserForCreation } from '../../services/api/users/types';
import { IErrors } from '../../services/graphql/types';
import { persistSignIn } from '../../services/store/Authentication/actionCreators';

export interface ISignUpProps {
  isSignedIn: boolean;
  persistSignIn: typeof persistSignIn;
}

export interface ISignUpState {
  company: ICompanyForCreation;
  companyErrors: IErrors;
  didSubmit: boolean;
  errors: IErrors;
  user: IUserForCreation;
  userErrors: IErrors;
  validations: {
    company: { [P in keyof ICompanyForCreation]: boolean; };
    user: { [P in keyof IUserForCreation]: boolean; };
  };
}
