import {
  IFindAllSubservicesApiResp,
  IGroupedEmployees,
} from "@/global/api/_interfaces";
import {
  IComplexModel,
  IEmployeeModel,
  IServiceModel,
  ISubServiceModel,
} from "@/global/models/_interfaces";

export interface IEmployeesProps {
  employee: IEmployeeModel | null;
  groupedEmployees: IGroupedEmployees[] | null;
}

export interface IEmployeeProps {
  employee: IEmployeeModel;
  groupedEmployees: IGroupedEmployees[] | null;
}

export interface IComplexesProps {
  groups: string[] | null;
  complexes: IComplexModel[] | null;
}

export interface IComplexProps {
  complex: Omit<IComplexModel, "examination"> & {
    examination: ISubServiceModel[] | null;
    modifiedPrice: number;
    modifiedFamDocPrice: number;
  };
}

export interface IServiceProps {
  services: IServiceModel[] | null;
  service: IServiceModel | null;
}
