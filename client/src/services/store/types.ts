import { IErrors } from '../api/shared/types';
import { IAuthenticationState } from './Authentication/types';
import { ICompaniesState } from './Companies/types';
import { ICompanyUsersState } from './CompanyUsers/types';
import { IFlashesState } from './Flashes/types';
import { IUsersState } from './Users/types';

export interface IApplicationState {
  authentication: IAuthenticationState;
  companies: ICompaniesState;
  companyUsers: ICompanyUsersState;
  flashes: IFlashesState;
  users: IUsersState;
}

export interface ILoadableState<T> {
  errors: IErrors;
  loaded: boolean;
  value: T | null | undefined;
}

export type IThunkAction =
  (
    dispatch: (action: { type: string, payload?: object}) => void,
    getState: () => IApplicationState
  ) => void;
