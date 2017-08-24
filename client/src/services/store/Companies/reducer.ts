import { ICompany } from '../../api/companies/types';
import { LoadingState } from '../types';
import * as actionTypes from './actionTypes';
import { ICompaniesState, initialState } from './types';

export default (state: ICompaniesState = initialState, { type, payload }) => {
  let newState: ICompaniesState;
  let companies: ICompany[];
  let company: ICompany;

  switch (type) {
    case actionTypes.RECEIVE_COMPANIES_BY_USER_ID_FAILURE:
      newState = {
        ...state,
        requestCompaniesByUserIdLoadingState: LoadingState.failure(payload.errors),
      };

      return newState;

    case actionTypes.RECEIVE_COMPANIES_BY_USER_ID_SUCCESS:
      companies = (payload.value as ICompany[]);

      newState = {
        ...state,
        companies: {
          ...state.companies,
          ...companies.reduce((acc, companyReduced) => ({
            ...acc,
            [companyReduced.id]: companyReduced,
          }), {}),
        },
        requestCompaniesByUserIdLoadingState: LoadingState.success(),
      };

      return newState;

    case actionTypes.RECEIVE_COMPANIES_BY_USER_ID_FAILURE:
      newState = {
        ...state,
        requestCompaniesByUserIdLoadingState: LoadingState.loading(),
      };

      return newState;

      case actionTypes.RECEIVE_COMPANY_CREATION_FAILURE:
      newState = {
        ...state,
        requestCreationLoadingState: LoadingState.failure(payload.errors),
      };

      return newState;

    case actionTypes.RECEIVE_COMPANY_CREATION_SUCCESS:
      company = (payload.value as ICompany);

      newState = {
        ...state,
        companies: {
          ...state.companies,
          [company.id]: company,
        },
        requestCreationLoadingState: LoadingState.success(),
      };

      return newState;

    case actionTypes.REQUEST_COMPANY_CREATION:
      newState = {
        ...state,
        requestCreationLoadingState: LoadingState.loading(),
      };

      return newState;

    default:
      return state;
  }
};
