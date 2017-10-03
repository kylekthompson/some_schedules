import * as React from 'react';

import { Link } from 'react-router-dom';

import { ICompanyProps } from './types';

const Company = ({ company }: ICompanyProps) => (
  <div className="col-md-6">
    <Link to={`/companies/${company.slug}`}><p>{company.name}</p></Link>
  </div>
);

export default Company;
