import { IComplexModel } from "@/global/models/_interfaces";

export interface IComplexContainerProps {
  groups: string[] | null;
  complexes: IComplexModel[] | null;
}
