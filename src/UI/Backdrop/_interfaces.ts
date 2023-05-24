import { ReactElement } from "react";

export interface BackdropProps {
  children: ReactElement;
  onClick: () => void;
  className?: string;
}
