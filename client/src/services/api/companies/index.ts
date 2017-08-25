import { get, post } from '../../utils/fetch';
import { IAPIResponse } from '../shared/types';
import { ICompany, ICompanyForCreation, ICreatedCompany } from './types';

export const getByUserId = (userId: number): Promise<IAPIResponse<ICompany[]>> =>
  get<ICompany[]>(`/api/v1/users/${userId}/companies`);

export const postCreate = (company: ICompanyForCreation): Promise<IAPIResponse<ICreatedCompany>> =>
  post<ICreatedCompany>('/api/v1/companies', { company });
