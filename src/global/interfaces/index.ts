import { IGroupedEmployees } from "@/global/api/_interfaces";
import { IComplexModel, IEmployeeModel } from "@/global/models/_interfaces";

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
  complex: IComplexModel | null;
}
