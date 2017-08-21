import { get, post } from '../../utils/fetch';
import { IAPIResponse } from '../shared/types';
import { ICreatedUser, IUser, IUserForCreation } from './types';

export const getUser = (id: number): Promise<IAPIResponse<IUser>> =>
  get<IUser>(`/api/v1/users/${id}`);

export const postSignUp = (user: IUserForCreation): Promise<IAPIResponse<ICreatedUser>> =>
  post<ICreatedUser>('/api/v1/users', { user });
