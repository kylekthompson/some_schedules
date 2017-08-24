import { ICompanyForCreation } from '../../services/api/companies/types';
import { requestCreation } from '../../services/store/Companies/actionCreators';
import { ILoadingState } from '../../services/store/types';

export interface ICompanySignUpProps {
  isSignedIn: boolean;
  requestCreation: typeof requestCreation;
  requestCreationLoadingState: ILoadingState;
}

export interface ICompanySignUpState {
  didSubmit: boolean;
  company: ICompanyForCreation;
  validations: {
    [P in keyof ICompanyForCreation]: boolean;
  };
}
