// tslint:disable-next-line:no-empty-interface
export interface IApplicationState {
  dummy: object;
}

export type IThunkAction =
  (
    dispatch: (action: { type: string, payload?: object}) => void,
    getState: () => IApplicationState
  ) => void;
