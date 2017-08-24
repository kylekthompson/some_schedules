import * as React from 'react';

import { Route } from 'react-router-dom';

import Loading from '../Loading';
import { ILoadingRouteProps } from './types';

const renderLoading = (message: string) => () => <Loading message={message} />;

const LoadingRoute = (props: ILoadingRouteProps) => {
  const { component, message, ...rest } = props;
  return <Route {...rest} render={renderLoading(message)} />;
};

export default LoadingRoute;
