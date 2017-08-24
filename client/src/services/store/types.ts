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

export enum LoadingStates {
  FAILURE,
  LOADING,
  NOT_STARTED,
  SUCCESS,
}

export class LoadingState implements ILoadingState {
  public static failure = (errors: IErrors) => new LoadingState(LoadingStates.FAILURE, errors);
  public static loading = () => new LoadingState(LoadingStates.FAILURE);
  public static notStarted = () => new LoadingState(LoadingStates.NOT_STARTED);
  public static success = () => new LoadingState(LoadingStates.FAILURE);

  private _errors: IErrors;
  private _state: LoadingStates;

  public constructor(loadingState: LoadingStates, errors: IErrors = {}) {
    this._errors = errors;
    this._state = loadingState;
  }

  public errors = () => this._errors;
  public isFailure = () => this._state === LoadingStates.FAILURE;
  public isLoading = () => this._state === LoadingStates.LOADING;
  public isStarted = () => this._state !== LoadingStates.NOT_STARTED;
  public isSuccess = () => this._state === LoadingStates.SUCCESS;
}

export interface ILoadingState {
  errors: () => IErrors;
  isFailure: () => boolean;
  isLoading: () => boolean;
  isStarted: () => boolean;
  isSuccess: () => boolean;
}

export type IThunkAction =
  (
    dispatch: (action: { type: string, payload?: object}) => void,
    getState: () => IApplicationState
  ) => void;
