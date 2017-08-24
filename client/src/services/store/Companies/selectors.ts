import * as decode from 'jwt-decode';

import { ICompany } from '../../api/companies/types';
import { getToken } from '../../utils/authentication';
import { getCompanyUsersForUserId } from '../CompanyUsers/selectors';
import { IApplicationState } from '../types';

export const getCompaniesForSignedInUser = (state: IApplicationState): ICompany[] => {
  if (!state.authentication.isSignedIn) { return []; }

  const userId = decode(getToken()).uid;
  const companyUsers = getCompanyUsersForUserId(state, userId);

  return Object.values(state.companies.companies).filter((company: ICompany) =>
    companyUsers.some((companyUser) => companyUser.companyId === company.id)
  );
};
