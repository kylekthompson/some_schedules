import { ICompanyForCreation, ICreatedCompany } from '../../../../services/api/companies/types';
import { requestSignUp } from '../../../../services/store/Users/actionCreators';
import { requestCreation } from '../../../../services/store/Companies/actionCreators';
import { ILoadableState } from '../../../../services/store/types';

export interface ICompanySignUpProps {
  companyCreation: ILoadableState<ICreatedCompany>,
  isSignedIn: boolean;
  requestCreation: typeof requestCreation;
  requestSignUp: typeof requestSignUp;
}

export interface ICompanySignUpState {
  didSubmit: boolean;
  company: ICompanyForCreation;
  validations: {
    [P in keyof ICompanyForCreation]: boolean;
  };
}
