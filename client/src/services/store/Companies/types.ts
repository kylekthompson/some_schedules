import { ICompany } from '../../api/companies/types';
import { ILoadingState, LoadingState } from '../types';

export const initialState: ICompaniesState = {
  companies: {},
  requestCompaniesByUserIdLoadingState: LoadingState.notStarted(),
  requestCreationLoadingState: LoadingState.notStarted(),
};

export interface ICompaniesById {
  [id: number]: ICompany;
}

export interface ICompaniesState {
  companies: ICompaniesById;
  requestCompaniesByUserIdLoadingState: ILoadingState;
  requestCreationLoadingState: ILoadingState;
}
