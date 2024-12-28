import { TButtonProps } from "../Button/Button.comp";

export type TSelectOption = {
  value: string;
  label: string;
};

export type TSelectProps = {
  label: string;
  size?: TButtonProps["size"];
  btnCN?: string;
  onChange: (option: TSelectOption) => void;
  value: TSelectOption;
  options: TSelectOption[];
};
