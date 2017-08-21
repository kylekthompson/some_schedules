import { ICreatedUser, IUser } from '../../api/users/types';
import { ILoadableState } from '../types';

export const initialState: IUsersState = {
  userCreation: {
    errors: {},
    loaded: false,
    value: null,
  },
  users: {},
};

export interface IUsersById {
  [id: number]: ILoadableState<IUser>;
}

export interface IUsersState {
  userCreation: ILoadableState<ICreatedUser>;
  users: IUsersById;
}
