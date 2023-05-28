import { FC } from "react";
import { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useOnClickOutside } from "@/global/hooks";
import { useTranslation } from "next-i18next";
import { INavItem } from "@/global/data";

const path01Variants = {
  open: { d: "M3.06061 2.99999L21.0606 21" },
  closed: { d: "M0 9.5L24 9.5" },
};

const path02Variants = {
  open: { d: "M3.00006 21.0607L21 3.06064" },
  moving: { d: "M0 14.5L24 14.5" },
  closed: { d: "M0 14.5L15 14.5" },
};

const navVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

export const NavMobile: FC<{ navItems: INavItem[] }> = ({ navItems }) => {
  const { t } = useTranslation("common");
  const [isOpen, setOpen] = useState(false);
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();
  const navRef = useRef(null);

  const handleClickOutside = () => {
    if (!isOpen) return;
    onClick();
  };

  const onClick = async () => {
    setOpen((prev) => !prev);
    if (!isOpen) {
      await path02Controls.start(path02Variants.moving);
      path01Controls.start(path01Variants.open);
      path02Controls.start(path02Variants.open);
    } else {
      path01Controls.start(path01Variants.closed);
      await path02Controls.start(path02Variants.moving);
      path02Controls.start(path02Variants.closed);
    }
  };

  useOnClickOutside(navRef, handleClickOutside);

  return (
    <div ref={navRef}>
      <button onClick={onClick}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <motion.path
            {...path01Variants.closed}
            animate={path01Controls}
            transition={{ duration: 0.2 }}
            stroke="#26292f"
          />
          <motion.path
            {...path02Variants.closed}
            animate={path02Controls}
            transition={{ duration: 0.2 }}
            stroke="#26292f"
          />
        </svg>
      </button>
      <motion.nav
        className="flex py-1 min-w-[200px] justify-between 
        items-center bg-light ml-1 
        absolute z-10 top-[50px] left-0 rounded-lg"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}
        transition={{ duration: "0.45", ease: "easeOut" }}
      >
        <div className="flex flex-col w-full items-center py-2">
          <div className="w-24 mb-4">
            <Link href="/">{/* <Logo /> */}</Link>
          </div>
          <ul className={`list-none sm:flex  items-center flex-1`}>
            {navItems.map((item, index) => {
              return (
                <li
                  key={item.title}
                  className={`font-comfortaa text-lg cursor-pointer ${
                    index === navItems.length - 1 ? "mb-0" : "mb-4"
                  }`}
                >
                  <Link href={item.href}>{t(`common.${item.title}`)}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </div>
  );
};
