import { RouteComponentProps } from 'react-router-dom';

interface ICompaniesRouteParams {
  slug?: string;
}

export interface ICompaniesProps extends RouteComponentProps<ICompaniesRouteParams> {
}
