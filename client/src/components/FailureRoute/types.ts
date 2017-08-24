import { RouteProps } from 'react-router-dom';

import { IErrors } from '../../services/api/shared/types';

export interface IFailureRouteProps extends RouteProps {
  errors: IErrors;
}
