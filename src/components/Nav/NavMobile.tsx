import { FC } from "react";
import { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useOnClickOutside } from "@/global/hooks";
import { useTranslation } from "next-i18next";
import { INavItem } from "@/global/data";
import { Logo } from "@/UI/Logo";
import { Footer } from "../Footer";
import { styles } from "@/styles/styles";
import { useRouter } from "next/router";

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
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 70,
      bounce: 0.05,
    },
  },
  closed: {
    opacity: 0,
    y: "-200%",
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 70,
      bounce: 0.05,
    },
  },
};

export const NavMobile: FC<{ navItems: INavItem[] }> = ({ navItems }) => {
  const { t } = useTranslation("common");
  const [isOpen, setOpen] = useState(false);
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();
  const navRef = useRef(null);
  const router = useRouter();
  const { asPath } = router;

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
        className="flex min-w-[200px] justify-between 
        items-center bg-lightShade 
        absolute z-50 top-[40px] left-0 rounded-lg w-full p-2 py-4 pb-2"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}
        transition={{ duration: "0.45", ease: "easeOut" }}
      >
        <div className="flex flex-col w-full items-center justify-between h-full">
          <div className="mb-4">
            <Logo className="h-[100px] w-auto mb-4" />
          </div>
          <ul className={`list-none flex flex-col items-start flex-1 w-full`}>
            {navItems.map((item, index) => {
              return (
                <li
                  key={item.title}
                  className={`font-comfortaa 
                  ${
                    asPath.includes(item.title) ||
                    (asPath === "/" && item.title === "main")
                      ? `${styles.gradientR} text-light`
                      : ""
                  }
                  w-full rounded-lg p-1 text-xl cursor-pointer text-dark ${
                    index === navItems.length - 1 ? "mb-0" : "mb-4"
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      onClick();
                      router.push(`${item.href}`);
                    }}
                  >
                    {t(`common.${item.title}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="max-h-[100px] mt-6 w-full">
            <Footer />
          </div>
        </div>
      </motion.nav>
    </div>
  );
};
