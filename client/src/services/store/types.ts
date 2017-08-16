import { IErrors } from '../api/shared/types';
import { IAuthenticationState } from './Authentication/model';
import { ICompaniesState } from './Companies/model';
import { ICompanyUsersState } from './CompanyUsers/model';
import { IUsersState } from './Users/model';

export interface IApplicationState {
  authentication: IAuthenticationState;
  companies: ICompaniesState;
  companyUsers: ICompanyUsersState;
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
