import { ICompanyUser } from '../../api/companyUsers/types';

export const initialState: ICompanyUsersState = {
  companyUsers: {},
};

export interface ICompanyUsersById {
  [id: number]: ICompanyUser;
}

export interface ICompanyUsersState {
  companyUsers: ICompanyUsersById;
}
