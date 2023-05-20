import { IEmployeeModel } from "@/global/models/_interfaces";

export interface IEmployeeContainerProps {
  departments: string[] | null;
  employees: IEmployeeModel[] | null;
}

export interface IEmployeeItemProps {
  departments: string[] | null;
  employee: IEmployeeModel | null;
}
