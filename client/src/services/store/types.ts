import { IErrors } from '../api/shared/types';
import { IAuthenticationState } from './Authentication/model';

export interface IApplicationState {
  authentication: IAuthenticationState;
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
