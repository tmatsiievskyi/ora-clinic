import { IServiceModel } from "@/global/models/_interfaces";

export interface IServiceContainerProps {
  services: IServiceModel[] | null;
  service: IServiceModel | null;
}
