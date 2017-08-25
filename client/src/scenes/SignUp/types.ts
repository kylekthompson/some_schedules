import { addFlash, clearFlashes } from '../../services/store/Flashes/actionCreators';
import { ILoadingState } from '../../services/store/types';

export enum SignUpPages {
  COMPANY_SIGN_UP,
  USER_SIGN_UP,
}

export interface ISignUpProps {
  addFlash: typeof addFlash;
  clearFlashes: typeof clearFlashes;
  isSignedIn: boolean;
  requestCreationLoadingState: ILoadingState;
  requestSignUpLoadingState: ILoadingState;
}

export interface ISignUpState {
  currentSignUpPage: SignUpPages;
}
