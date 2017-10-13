import { RouteComponentProps } from 'react-router-dom';

import { ICompany } from '../../services/graphql/types';

export interface ICompanyDashboardQueryResult {
  company: ICompany;
}

export interface ICompanyDashboardProps extends RouteComponentProps<{ slug: string }> {
  userId: number;
}

export interface ICompanyDashboardState {
  company?: ICompany;
}
