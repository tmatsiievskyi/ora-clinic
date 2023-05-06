import { Variants, motion as m, useAnimationControls } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { IAnimTextCharProps } from "./_interfaces";

export const AnimatedTextCharacter = ({
  i18nKey,
  type,
  className,
}: IAnimTextCharProps) => {
  const { t } = useTranslation("common");
  const controls = useAnimationControls();

  const animVariants: { [keys: string]: Variants } = {
    right: {
      hidden: { opacity: 0, x: -20 },
    },
    left: {
      hidden: { opacity: 0, x: 20 },
    },
  };

  useEffect(() => {
    controls.set("hidden");
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 * i, duration: 0.3, ease: "easeInOut" },
    }));
  }, [i18nKey, controls]);

  return (
    <m.div
      className={`overflow-hidden flex flex-wrap ${className}`}
      variants={animVariants.container}
      initial="hidden"
      animate={controls}
    >
      {t(`${i18nKey}`)
        .split("")
        .map((char, index) => {
          return (
            <m.span
              key={char + index}
              variants={animVariants[type as keyof typeof animVariants]}
              custom={index}
              animate={controls}
              initial="hidden"
            >
              {char === " " ? "\u00A0" : char}
            </m.span>
          );
        })}
    </m.div>
  );
};
