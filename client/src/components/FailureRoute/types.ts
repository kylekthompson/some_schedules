import { RouteProps } from 'react-router-dom';

import { IErrors } from '../../services/graphql/types';

export interface IFailureRouteProps extends RouteProps {
  errors: IErrors;
}
