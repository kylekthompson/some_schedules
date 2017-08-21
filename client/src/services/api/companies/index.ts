import { post } from '../../utils/fetch';
import { IAPIResponse } from '../shared/types';
import { ICompanyForCreation, ICreatedCompany } from './types';

export const postCreate = (company: ICompanyForCreation): Promise<IAPIResponse<ICreatedCompany>> =>
  post<ICreatedCompany>('/api/v1/companies', { company });
