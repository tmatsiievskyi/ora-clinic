import { useTranslation } from "next-i18next";
import { motion as m, Variants, useAnimationControls } from "framer-motion";

import { ArrowLeft } from "@/UI/Arrows";
import { ISidebarProps } from "./_interfaces";
import { PageTitle } from "../PageTitle";

export const Sidebar = ({
  title,
  children,
  handleOpen,
  isOpen,
}: ISidebarProps) => {
  const { t } = useTranslation("common");
  const controls = useAnimationControls();

  const arrowVar: Variants = {
    left: {
      rotate: 180,
      transition: {
        delay: 0.4,
        duration: 0.3,
        type: "spring",
        stiffness: 60,
        bounce: 0.55,
      },
    },
    right: {
      rotate: 0,
      transition: {
        delay: 0.4,
        duration: 0.3,
        type: "spring",
        stiffness: 60,
        bounce: 0.55,
      },
    },
  };

  const onArrowClick = () => {
    handleOpen();
    isOpen ? controls.start("left") : controls.start("right");
  };

  return (
    <div
      className={`absolute top-0 z-30 ease-in rounded-l-lg duration-300  ${
        isOpen
          ? "min-w-[280px] w-[280px] sm:w-[340px]"
          : "min-w-[90px] w-[90px]"
      }  md:static  overflow-hidden flex h-full bg-light border-r border-lightShade`}
    >
      <aside
        className={`flex-shrink-0  w-full h-full over overflow-scroll no-scrollbar`}
      >
        <div className="py-2 flex flex-col justify-between  md:py-4 sticky top-[-1px] border-b border-lightShade z-30 bg-light">
          <div className="relative md:mt-0 flex flex-col text-center justify-center items-center bg-light/40 rounded-lg text-dark">
            <PageTitle title={title} className="" />
          </div>
          <div
            onClick={() => onArrowClick()}
            className="h-[35px] mt-2 bg-lightShade cursor-pointer w-full flex justify-center items-center"
          >
            <m.div variants={arrowVar} initial="left" animate={controls}>
              <ArrowLeft classNameArrow="w-8 h-8 text-primary" />
            </m.div>
          </div>
        </div>
        <div className="">{children}</div>
      </aside>
    </div>
  );
};
