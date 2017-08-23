import * as decode from 'jwt-decode';

import { ICompany } from '../../api/companies/types';
import { getToken } from '../../utils/authentication';
import { getCompanyUsersForUserId } from '../CompanyUsers/selectors';
import { IApplicationState, ILoadableState } from '../types';

export const getCompaniesForSignedInUser = (state: IApplicationState): ICompany[] => {
  if (!state.authentication.isSignedIn) { return []; }

  const userId = decode(getToken()).uid;
  const companyUsers = getCompanyUsersForUserId(state, userId);

  return Object.values(state.companies.companies).filter((company: ILoadableState<ICompany>) => {
    if (!company.value) { return false; }
    return companyUsers.some((companyUser) => companyUser.companyId === (company.value as ICompany).id);
  }).map((company) => company.value);
};
