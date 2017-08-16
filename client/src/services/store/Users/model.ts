import { IUser } from '../../api/users/types';
import { ILoadableState } from '../types';

export const initialState: IUsersState = {
  users: {},
};

export interface IUsersById {
  [id: number]: ILoadableState<IUser>;
}

export interface IUsersState {
  users: IUsersById;
}
