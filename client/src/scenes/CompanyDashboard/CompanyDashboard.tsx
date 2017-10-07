import * as React from 'react';

import { ICompanyDashboardProps } from './types';

const CompanyDashboard = (props: ICompanyDashboardProps) => (
  <p>{props.match.params.slug}</p>
);

export default CompanyDashboard;
