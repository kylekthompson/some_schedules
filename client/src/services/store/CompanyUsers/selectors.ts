import { ICompanyUser } from '../../api/companyUsers/types';
import { IApplicationState } from '../types';

export const getCompanyUsersForUserId = (state: IApplicationState, userId: number): ICompanyUser[] =>
  Object.values(state.companyUsers).filter((companyUser) => companyUser.userId === userId);
