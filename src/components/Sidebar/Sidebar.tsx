import { LinkWithActive } from "@/UI/Link";
import Image from "next/image";
import { ISidebarProps } from "./_interfaces";
import { ArrowLeft } from "@/UI/Arrows";
import Link from "next/link";
import { motion as m, Variants, useAnimationControls } from "framer-motion";

export const Sidebar = ({
  classNameBox,
  classNameLink,
  items,
  activeItem,
  handleOpen,
  isOpen,
}: ISidebarProps) => {
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
    <div className={`${classNameBox}`}>
      <ul className="overflow-scroll">
        {items.map((item) => {
          return (
            <li
              key={item.key}
              className="flex items-center mb-1 w-full justify-start"
            >
              <Link
                href={item.href}
                className="h-full min-w-[35px] bg-lightShade rounded-lg"
              >
                <Image
                  src={`/img/svg/${item.key}.svg`}
                  width={35}
                  height={35}
                  alt="icon"
                  className={`${
                    activeItem === item.key ? "active" : null
                  }  [&.active]:border-solid [&.active]:border-[1px] [&.active]:border-primary rounded-lg`}
                />
              </Link>

              {isOpen && (
                <LinkWithActive
                  href={item.href}
                  i18nKey={item.i18nKey}
                  active={activeItem === item.key ? true : false}
                  className={classNameLink}
                />
              )}
            </li>
          );
        })}
      </ul>
      <div
        onClick={() => onArrowClick()}
        className="h-[35px] bg-lightShade cursor-pointer rounded-lg w-full flex justify-center items-center"
      >
        <m.div variants={arrowVar} initial="left" animate={controls}>
          <ArrowLeft classNameArrow="w-8 h-8 text-primary" />
        </m.div>
      </div>
    </div>
  );
};
