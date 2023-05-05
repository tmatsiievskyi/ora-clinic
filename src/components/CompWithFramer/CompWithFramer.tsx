import {
  motion as m,
  useAnimate,
  useAnimation,
  Variants,
  useInView,
} from "framer-motion";
import { useEffect } from "react";
import { ICompWithFramerProps } from "./_interfaces";

export const CompWithFramer = ({
  children,
  className,
  from,
  delay,
  duration,
}: ICompWithFramerProps) => {
  const controls = useAnimation();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const compVariants: { [keys: string]: Variants } = {
    left: {
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: duration,
          delay: delay,
          type: "tween",
        },
      },
      hidden: { opacity: 0, x: "-50%" },
    },
    right: {
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: duration, delay: delay, type: "tween" },
      },
      hidden: { opacity: 0, x: "50%" },
    },
    width: {
      visible: {
        width: "100%",
        opacity: 1,
        transition: { duration: duration, delay: delay, type: "tween" },
      },
      hidden: {
        width: "50%",
        opacity: 0,
      },
    },
  };

  return (
    <m.div
      ref={scope}
      variants={compVariants[from as keyof typeof compVariants]}
      animate={controls}
      initial="hidden"
      className={className}
    >
      {children}
    </m.div>
  );
};
