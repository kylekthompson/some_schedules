import { post } from '../../utils/fetch';
import { IAPIResponse } from '../shared/types';
import { IAuthenticationCredentials, IAuthenticationToken } from './types';

export const postSignIn = (auth: IAuthenticationCredentials): Promise<IAPIResponse<IAuthenticationToken>> =>
  post<IAuthenticationToken>('/api/v1/sign_in', { auth });
