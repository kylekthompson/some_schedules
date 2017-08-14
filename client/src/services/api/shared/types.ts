export interface IAPIResponse<T> {
  errors?: IErrors;
  status: number;
  value?: T;
}

export interface IErrors {
  [key: string]: string[];
}
