import { ICompanyForCreation } from '../../services/api/companies/types';
import { IErrors } from '../../services/graphql/types';

export interface ICompanySignUpProps {
  isSignedIn: boolean;
  onSignUpSuccess: () => void;
}

export interface ICompanySignUpState {
  company: ICompanyForCreation;
  didSubmit: boolean;
  errors: IErrors;
  validations: {
    [P in keyof ICompanyForCreation]: boolean;
  };
}
