import { IUser } from '../../api/users/types';
import { ILoadingState, LoadingState } from '../types';

export const initialState: IUsersState = {
  requestSignUpLoadingState: LoadingState.notStarted(),
  requestUserByIdLoadingState: LoadingState.notStarted(),
  users: {},
};

export interface IUsersById {
  [id: number]: IUser;
}

export interface IUsersState {
  requestSignUpLoadingState: ILoadingState;
  requestUserByIdLoadingState: ILoadingState;
  users: IUsersById;
}
