import { IGroupedEmployees } from "@/global/api/_interfaces";
import { IEmployeeModel } from "@/global/models/_interfaces";

export interface IEmployeeContainerProps {
  groupedEmployees: IGroupedEmployees[] | null;
  employee: IEmployeeModel | null;
}
