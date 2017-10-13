export interface IEdge<NodeType> {
  node: NodeType;
};

export interface IEdges<NodeType> {
  edges: IEdge<NodeType>[];
}

export interface ICompany {
  name: string;
  slug: string;
  users: IEdges<IUser>;
}

export type IUserRole = 'OWNER' | 'MANAGER' | 'SUPERVISOR' | 'EMPLOYEE';

export interface IErrors {
  [key: string]: string[];
}

export interface IUser {
  company: ICompany;
  email: string;
  firstName: string;
  lastName: string;
  role: IUserRole;
}
