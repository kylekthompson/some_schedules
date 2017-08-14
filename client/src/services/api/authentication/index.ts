import { post } from '../../utils/fetch';
import { IAPIResponse } from '../shared/types';
import { IAuthenticationCredentials, IAuthenticationToken, ICreatedUser, IUserForCreation } from './types';

export const postSignIn = (auth: IAuthenticationCredentials): Promise<IAPIResponse<IAuthenticationToken>> =>
  post<IAuthenticationToken>('/api/v1/sign_in', { auth });
export const postSignUp = (user: IUserForCreation): Promise<IAPIResponse<ICreatedUser>> =>
  post<ICreatedUser>('/api/v1/users', { user });
