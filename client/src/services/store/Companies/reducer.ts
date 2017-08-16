import { ICompany, ICreatedCompany } from '../../api/companies/types';
import * as actionTypes from './actionTypes';
import { ICompaniesState, initialState } from './model';

export default (state: ICompaniesState = initialState, { type, payload }) => {
  let newState: ICompaniesState;
  let company: ICompany;
  let createdCompany: ICreatedCompany;

  switch (type) {
    case actionTypes.RECEIVE_COMPANY_CREATION_FAILURE:
      newState = {
        ...state,
        companyCreation: {
          ...state.companyCreation,
          errors: payload.errors,
          loaded: true,
          value: null,
        },
      };

      return newState;

    case actionTypes.RECEIVE_COMPANY_CREATION_SUCCESS:
      createdCompany = { ...(payload.value as ICreatedCompany) };
      const temp: ICreatedCompany = { ...createdCompany };
      delete temp.companyUsers;
      company = (temp as ICompany);

      newState = {
        ...state,
        companies: {
          ...state.companies,
          [createdCompany.id]: {
            errors: {},
            loaded: true,
            value: company,
          },
        },
        companyCreation: {
          ...state.companyCreation,
          errors: {},
          loaded: true,
          value: createdCompany,
        },
      };

      return newState;

    case actionTypes.REQUEST_COMPANY_CREATION:
      newState = {
        ...state,
        companyCreation: {
          ...state.companyCreation,
          errors: {},
          loaded: false,
          value: null,
        },
      };

      return newState;

    default:
      return state;
  }
};
