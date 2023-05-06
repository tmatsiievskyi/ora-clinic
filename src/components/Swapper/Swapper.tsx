import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  Children,
  cloneElement,
  Fragment,
} from "react";
import { motion as m } from "framer-motion";
import { ISwapperProps } from "./_interfaces";

export const Swapper = ({ children }: ISwapperProps) => {
  const [itemsWidth, setItemsWidth] = useState<number>(0);
  const sliderRef = useRef() as MutableRefObject<HTMLInputElement>;
  const isDragging = useRef(false);

  useEffect(() => {
    if (!sliderRef.current) return;
    setItemsWidth(
      sliderRef?.current.scrollWidth - sliderRef?.current.offsetWidth,
    );
  }, []);

  const onClickHandler = () => {};

  return (
    <m.div ref={sliderRef} className="h-full cursor-grab, flex overflow-hidden">
      <m.div
        drag="x"
        dragConstraints={{ right: 0, left: -itemsWidth }}
        className="flex"
        onDragStart={() => {
          isDragging.current = true;
        }}
        onDragEnd={() => {
          setTimeout(() => {
            isDragging.current = false;
          }, 150);
        }}
      >
        {children.map((item, index) => {
          return (
            <Fragment key={index}>{item}</Fragment>
            // < key={index}>
            //   {item}
            // </>
          );
        })}
        {/* {Children.map(children, (child) => {
          return cloneElement(
            child,
            {
              onClick: onClickHandler,
            },
            null,
          );
        })} */}
      </m.div>
    </m.div>
  );
};
