import { IAuthenticationState } from './Authentication/model';

export interface IApplicationState {
  authentication: IAuthenticationState;
}

export type IThunkAction =
  (
    dispatch: (action: { type: string, payload?: object}) => void,
    getState: () => IApplicationState
  ) => void;
