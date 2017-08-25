import * as React from 'react';

import { Route } from 'react-router-dom';

import { IErrors } from '../../services/api/shared/types';
import Failure from '../Failure';
import { IFailureRouteProps } from './types';

const renderFailure = (errors: IErrors) => () => <Failure errors={errors} />;

const FailureRoute = (props: IFailureRouteProps) => {
  const { component, errors, ...rest } = props;
  return <Route {...rest} render={renderFailure(errors)} />;
};

export default FailureRoute;
