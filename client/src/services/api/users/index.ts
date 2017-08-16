import { post } from '../../utils/fetch';
import { IAPIResponse } from '../shared/types';
import { ICreatedUser, IUserForCreation } from './types';

export const postSignUp = (user: IUserForCreation): Promise<IAPIResponse<ICreatedUser>> =>
  post<ICreatedUser>('/api/v1/users', { user });
