import * as React from 'react';

import { ICompanyUser, ICompanyUserRole } from '../../../../../../services/graphql/types';
import Company from '../Company';
import { ICompanyUsersProps } from './types';

const rolesAndTitles: { [KEY in ICompanyUserRole]: string } = {
  'OWNER': 'You are an owner of these companies:',
  'MANAGER': 'You are a manager of these companies:',
  'SUPERVISOR': 'You are a supervisor of these companies:',
  'EMPLOYEE': 'You are an employee of these companies:',
}

const companyUsersInRole = (companyUsers: ICompanyUser[], role: string) =>
  companyUsers.filter((companyUser) => companyUser.role === role);

const renderCompanyUsers = (companyUsers: ICompanyUser[], role: string) => (
  companyUsers.length > 0 && (
    <div key={role} className="row">
      <div className="col-md-12">
        <p style={{ fontSize: '18px' }}>{rolesAndTitles[role]}</p>
      </div>
      {companyUsers.map((companyUser) => <Company key={companyUser.company.slug} company={companyUser.company} />)}
    </div>
  )
);

const CompanyUsers = ({ companyUsers }: ICompanyUsersProps) => (
  <div>
    {Object.keys(rolesAndTitles).map((role) => renderCompanyUsers(companyUsersInRole(companyUsers, role), role))}
  </div>
);

export default CompanyUsers;
