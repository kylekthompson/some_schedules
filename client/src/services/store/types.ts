import { IErrors } from '../api/shared/types';
import { IAuthenticationState } from './Authentication/model';
import { IUsersState } from './Users/model';

export interface IApplicationState {
  authentication: IAuthenticationState;
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
