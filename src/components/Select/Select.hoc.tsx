import { SelectComponent } from "./Select.component";
import { TSelectProps } from "./_interfaces";

export const WithSelect = ({
  label,
  size,
  btnCN,
  options,
  onChange,
  value,
}: TSelectProps) => (
  <SelectComponent
    btnCN={btnCN}
    label={label}
    onChange={onChange}
    options={options}
    size={size}
    value={value}
  />
);
