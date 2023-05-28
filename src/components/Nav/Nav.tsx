import { FC } from "react";
import { useTranslation } from "next-i18next";
import { INavItem } from "@/global/data";
import { LinkWithActive } from "@/UI/Link";
import { useRouter } from "next/router";
import { styles } from "@/styles/styles";

export const Nav: FC<{ navItems: INavItem[] }> = ({ navItems }) => {
  const { t } = useTranslation("common");
  const { asPath } = useRouter();

  return (
    <nav className="w-full flex py-1 justify-between items-center">
      <ul className={`list-none sm:flex hidden items-center flex-1`}>
        {navItems.map((item, index) => {
          return (
            <li
              key={item.title}
              className={` cursor-pointer rounded-lg ${
                index === navItems.length - 1 ? "mr-0" : "mr-2 lg:mr-4"
              }
              
              `}
            >
              <LinkWithActive
                className="font-comfortaa text-dark text-sm"
                href={item.href}
                active={
                  asPath.includes(item.title) ||
                  (asPath === "/" && item.title === "main")
                    ? true
                    : false
                }
                i18nKey={t(`common.${item.title}`)}
              />
            </li>
          );
        })}
      </ul>
      <p></p>
    </nav>
  );
};
