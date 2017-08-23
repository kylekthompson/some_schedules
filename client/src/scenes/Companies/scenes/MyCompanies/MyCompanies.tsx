import * as React from 'react';

import { IMyCompaniesProps } from './types';

const MyCompanies = ({ companies }: IMyCompaniesProps) => (
  <div>
    {companies.map((company) => <p key={company.id}>{company.name}</p>)}
  </div>
);

export default MyCompanies;
