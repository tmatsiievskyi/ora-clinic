import { IGroupedEmployees } from "@/global/api/_interfaces";
import { IEmployeeModel } from "@/global/models/_interfaces";

export interface IEmployeesProps {
  employee: IEmployeeModel | null;
  groupedEmployees: IGroupedEmployees[] | null;
}

export interface IEmployeeProps {
  employee: IEmployeeModel;
  groupedEmployees: IGroupedEmployees[] | null;
}
