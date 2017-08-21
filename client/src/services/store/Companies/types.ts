import { ICompany, ICreatedCompany } from '../../api/companies/types';
import { ILoadableState } from '../types';

export const initialState: ICompaniesState = {
  companies: {},
  companyCreation: {
    errors: {},
    loaded: false,
    value: null,
  },
};

export interface ICompaniesById {
  [id: number]: ILoadableState<ICompany>;
}

export interface ICompaniesState {
  companies: ICompaniesById;
  companyCreation: ILoadableState<ICreatedCompany>;
}
