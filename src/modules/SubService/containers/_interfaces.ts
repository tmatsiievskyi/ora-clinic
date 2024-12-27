import { IGroupedSubService } from "@/global/api/_interfaces";
import { ISubServiceModel } from "@/global/models/_interfaces";

export interface ISubServiceContainerProps {
  subService: ISubServiceModel | null;
  groupedSubServices: IGroupedSubService[] | null;
}

export type TSortDirection = "asc" | "desc" | null;
