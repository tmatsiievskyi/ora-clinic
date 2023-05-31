import { usePrev } from "@/global//hooks/usePrev";
import { FC, useState, Children } from "react";
import { ISliderProps } from "./_interfaces";
import { AnimatePresence, motion as m } from "framer-motion";

export const Slider: FC<ISliderProps> = ({
  children,
  arrowsColor,
  buttonStyle,
  wrapperStyle,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prev = usePrev(activeIndex);
  let direction: string = activeIndex > prev ? "inc" : "dec";

  const updateIndex = (newIndex: number) => {
    const numOfChild = Children.count(children);
    if (newIndex < 0) {
      newIndex = numOfChild - 1;
    }
    if (newIndex >= numOfChild) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };
  return (
    <div className="flex h-full overflow-hidden">
      <div
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
        className={`flex items-center z-20 relative justify-center cursor-pointer ${buttonStyle}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 text-${arrowsColor ? arrowsColor : "lightShade"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <m.div
        key={activeIndex}
        variants={variants}
        transition={{ duration: "0.45", ease: "easeOut" }}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction}
        className={`w-full ${wrapperStyle}`}
      >
        <AnimatePresence custom={direction} key={activeIndex}>
          {children[activeIndex]}
        </AnimatePresence>
      </m.div>
      <div
        onClick={() => {
          updateIndex(activeIndex + 1);
        }}
        className={`flex items-center z-20 relative justify-center cursor-pointer ${buttonStyle}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 text-${arrowsColor ? arrowsColor : "lightShade"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
};

const variants = {
  enter: (direction: string) => ({
    x: direction === "inc" ? 600 : -600,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: string) => ({
    x: direction === "inc" ? -600 : 600,
    opacity: 0,
  }),
};
