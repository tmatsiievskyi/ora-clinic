import { FilterQuery } from "mongoose";
import { IEmployeeModel, ISubServiceModel } from "../models/_interfaces";

export type TFilterQuery<T> = {} & FilterQuery<T>;

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

export interface IGroupedSubService {
  data: ISubServiceModel[];
  _id: string;
}

export interface IFindAllSubservices {
  search?: string | undefined;
  page?: string | undefined;
  limit?: string | undefined;
  sortField?: string | undefined;
  sortOrder?: string | undefined;
  lng?: string | undefined;
}

export interface IFindAllSubservicesApiResp {
  data: Record<string, Record<string, ISubServiceModel[]>>;
  total: number;
  currentPage: number;
  totalPages: number;
}
