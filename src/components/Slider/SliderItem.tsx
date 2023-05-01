import { FC } from "react";
import { ISliderItem } from "./_interfaces";

export const SliderItem: FC<ISliderItem> = ({ children, ...props }) => {
  return (
    <div className="flex flex-col justify-between h-full w-full" {...props}>
      {children}
    </div>
  );
};
