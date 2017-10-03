import { RouteComponentProps } from 'react-router-dom';

import { ICompanyUser, IUser } from '../../../../services/graphql/types';
import { addFlash } from '../../../../services/store/Flashes/actionCreators';

export interface IMyCompaniesQueryResult {
  user: IUser;
}

export interface IMyCompaniesProps extends RouteComponentProps<{}> {
  addFlash: typeof addFlash;
  userId: number;
}

export interface IMyCompaniesState {
  companyUsers?: ICompanyUser[];
}
