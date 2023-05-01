import { FC } from "react";
import { IButtonProps } from "./_interfaces";
import { useTranslation } from "next-i18next";

export const Button: FC<IButtonProps> = ({ type, children }) => {
  switch (type) {
    case "primary":
      return (
        <button className="middle min-h-[35px]  none center rounded-lg bg-primary py-1 px-4 font-helveticRegular text-xs  uppercase text-lightShade focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          {children}
        </button>
      );

    case "light":
      return (
        <button className="middle min-h-[35px] none center border-solid border-primary border-[0.5px] rounded-lg bg-light py-1 px-4 font-helveticRegular text-xs  uppercase text-primary focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          {children}
        </button>
      );

    default:
      return null;
  }
};
