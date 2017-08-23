import { ICompanyUser } from '../../api/companyUsers/types';
import { IApplicationState } from '../types';

export const getCompanyUsersForUserId = (state: IApplicationState, userId: number): ICompanyUser[] => {
  const companyUsers: ICompanyUser[] = Object.values(state.companyUsers.companyUsers)
    .filter((companyUser) => companyUser.value)
    .map((companyUser) => companyUser.value);

  return companyUsers.filter((companyUser) => companyUser.userId === userId);
};
