import { ICreatedCompany } from '../../services/api/companies/types';
import { ICreatedUser } from '../../services/api/users/types';
import { addFlash, clearFlashes } from '../../services/store/Flashes/actionCreators';
import { ILoadableState } from '../../services/store/types';

export enum SignUpPages {
  COMPANY_SIGN_UP,
  USER_SIGN_UP,
}

export interface ISignUpProps {
  addFlash: typeof addFlash;
  clearFlashes: typeof clearFlashes;
  companyCreation: ILoadableState<ICreatedCompany>;
  isSignedIn: boolean;
  userCreation: ILoadableState<ICreatedUser>;
}

export interface ISignUpState {
  currentSignUpPage: SignUpPages;
}
