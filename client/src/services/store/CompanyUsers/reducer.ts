import { ICreatedCompany } from '../../api/companies/types';
import * as companyActionTypes from '../Companies/actionTypes';
import { ICompanyUsersById, ICompanyUsersState, initialState } from './model';

export default (state: ICompanyUsersState = initialState, { type, payload }) => {
  let newState: ICompanyUsersState;

  switch (type) {
    case companyActionTypes.RECEIVE_COMPANY_CREATION_SUCCESS:
      const createdCompany = { ...(payload.value as ICreatedCompany) };

      const companyUsers: ICompanyUsersById = createdCompany.companyUsers.reduce((acc, companyUser) => ({
        ...acc,
        [companyUser.id]: {
          errors: {},
          loaded: true,
          value: companyUser,
        },
      }), {});

      newState = {
        ...state,
        companyUsers: {
          ...state.companyUsers,
          ...companyUsers,
        },
      };

      return newState;

    default:
      return state;
  }
};
