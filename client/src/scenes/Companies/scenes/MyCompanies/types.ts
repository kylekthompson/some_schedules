import { RouteComponentProps } from 'react-router-dom';

import { ICompany } from '../../../../services/api/companies/types';
import { requestCompaniesByUserId } from '../../../../services/store/Companies/actionCreators';

export interface IMyCompaniesProps extends RouteComponentProps<{}> {
  companies: ICompany[];
  requestCompaniesByUserId: typeof requestCompaniesByUserId;
}
