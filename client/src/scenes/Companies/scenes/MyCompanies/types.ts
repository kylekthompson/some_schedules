import { RouteComponentProps } from 'react-router-dom';

import { ICompany } from '../../../../services/api/companies/types';
import { addFlash } from '../../../../services/store/Flashes/actionCreators';

export interface IMyCompaniesProps extends RouteComponentProps<{}> {
  addFlash: typeof addFlash;
  userId: number;
}

export interface IMyCompaniesState {
  companies?: Partial<ICompany>[];
}
