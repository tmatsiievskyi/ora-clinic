import { motion as m } from "framer-motion";
import { FC } from "react";
import { BackdropProps } from "./_interfaces";

export const Backdrop: FC<BackdropProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <m.div
      className={`absolute bg-dark/80 top-0 left-0 w-full h-full bg-darkTr flex justify-center items-center z-20 ${className}`}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </m.div>
  );
};
