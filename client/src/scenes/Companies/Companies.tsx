import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import CompanyDashboard from './scenes/CompanyDashboard';
import MyCompanies from './scenes/MyCompanies';
import { ICompaniesProps } from './types';

const Companies = ({ match }: ICompaniesProps) => (
  <Switch>
    {match.params.slug && <Route exact path={`${match.url}`} component={CompanyDashboard} />}
    {!match.params.slug && <Route exact path={`${match.url}`} component={MyCompanies} />}
  </Switch>
);

export default Companies;
