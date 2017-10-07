export interface IEdge<NodeType> {
  node: NodeType;
};
export interface IEdges<NodeType> {
  edges: IEdge<NodeType>[];
}

export interface ICompany {
  companyUsers: IEdges<ICompanyUser>;
  name: string;
  slug: string;
  users: IEdges<IUser>;
}

export type ICompanyUserRole = 'OWNER' | 'MANAGER' | 'SUPERVISOR' | 'EMPLOYEE';

export interface ICompanyUser {
  company: ICompany;
  role: ICompanyUserRole;
  user: IUser;
}

export interface IErrors {
  [key: string]: string[];
}

export interface IUser {
  companies: IEdges<ICompany>;
  companyUsers: IEdges<ICompanyUser>;
  email: string;
  firstName: string;
  lastName: string;
}
