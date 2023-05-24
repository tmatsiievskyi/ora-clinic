import { motion as m } from "framer-motion";
import { Backdrop } from "@/UI/Backdrop";
import { FC, Fragment, useState } from "react";
import { IModalProps } from "./_interfaces";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 50,
      stiffness: 300,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export const Modal: FC<IModalProps> = ({
  isOpen,
  onClose,
  children,
  bodyStyle,
}) => {
  return (
    <Backdrop onClick={onClose}>
      <m.div
        onClick={(e) => e.stopPropagation()}
        className={`overflow-x-scroll max-h-[90%] ${bodyStyle}`}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </m.div>
    </Backdrop>
  );
};
