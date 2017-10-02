import { ICompanyForCreation } from '../../services/api/companies/types';

export interface ICompanySignUpProps {
  isSignedIn: boolean;
  onSuccess: () => void;
}

export interface ICompanySignUpState {
  didSubmit: boolean;
  company: ICompanyForCreation;
  validations: {
    [P in keyof ICompanyForCreation]: boolean;
  };
}
