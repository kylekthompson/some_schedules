import { IUser } from '../../services/graphql/types';

export interface ICompaniesQueryResult {
  user: IUser;
}

export interface ICompaniesProps {
  userId: number;
}

export interface ICompaniesState {
  user?: IUser;
}
