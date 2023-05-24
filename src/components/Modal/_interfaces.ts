import { ReactElement } from "react";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
  bodyStyle?: string;
}
