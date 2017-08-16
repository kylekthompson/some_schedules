import { ICompanyUser } from '../../api/companyUsers/types';
import { ILoadableState } from '../types';

export const initialState: ICompanyUsersState = {
  companyUsers: {},
};

export interface ICompanyUsersById {
  [id: number]: ILoadableState<ICompanyUser>;
}

export interface ICompanyUsersState {
  companyUsers: ICompanyUsersById;
}
