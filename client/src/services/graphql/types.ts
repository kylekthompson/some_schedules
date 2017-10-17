export interface IEdge<NodeType> {
  node: NodeType;
};

export interface IEdges<NodeType> {
  edges: IEdge<NodeType>[];
}

export interface ICompany {
  createdAt: string;
  name: string;
  slug: string;
  updatedAt: string;
  shifts: IEdges<IShift>;
  users: IEdges<IUser>;
}

export type IUserRole = 'OWNER' | 'MANAGER' | 'SUPERVISOR' | 'EMPLOYEE';

export interface IErrors {
  [key: string]: string[];
}

export interface IShift {
  createdAt: string;
  endTime: string;
  published: boolean;
  startTime: string;
  updatedAt: string;
  user: IUser;
}

export interface IUser {
  company: ICompany;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  role: IUserRole;
  shifts: IShift[];
  updatedAt: string;
}
