import { IEmployeeModel } from "../models/_interfaces";

export interface IResp<T> {
  data: T;
  status: number;
  success: boolean;
  message?: string;
}

export interface IGroupedEmployees {
  data: IEmployeeModel[];
  _id: string;
}
