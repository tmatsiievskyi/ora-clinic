import { useState } from "react";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { forwardRef } from "react";
import { MenuLinkProps } from "./_interfaces";

const MenuLink = forwardRef((props: MenuLinkProps, ref) => {
  let { href, locale, children, ...rest } = props;
  return (
    <Link href={href} locale={locale}>
      {children}
    </Link>
  );
});

MenuLink.displayName = "MenuLink";

export const LngSelect = () => {
  const { locales = [], locale, asPath: currentPath } = useRouter();
  const { t } = useTranslation("common");

  return (
    <Menu as="div" className="relative inline-block text-left z-30">
      <Menu.Button
        className="inline-flex w-full justify-center items-center min-w-[80px] min-h-[35px] rounded-md border
         border-gray-300 bg-white px-2 py-1 text-sm font-medium
          text-gray-700 shadow-sm hover:bg-gray-50
           focus:outline-none focus:ring-2 focus:none focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        <span className="mr-1">{t(`common.locale.${locale}`)}</span>
        <Image
          src={`/img/${locale}-flag.png`}
          width={25}
          height={25}
          alt={locale || "language"}
        />
      </Menu.Button>

      <Menu.Items className="absolute right-0 z-10 mt-2 w-[80px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {[...locales]
          .filter((item) => item !== locale)
          .map((locale) => {
            return (
              <div
                key={locale}
                className="inline-flex w-full justify-center items-center min-w-[80px] min-h-[35px] rounded-md border
                border-gray-300 bg-white px-2 py-1 text-sm font-medium
                 text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-offset-2 focus:ring-offset-gray-100"
              >
                <Menu.Item>
                  <MenuLink href={currentPath} locale={locale}>
                    <span className="flex items-center">
                      <span className="mr-1">
                        {t(`common.locale.${locale}`)}
                      </span>
                      <Image
                        src={`/img/${locale}-flag.png`}
                        width={25}
                        height={25}
                        alt={locale || "language"}
                        style={{ marginInlineStart: "0" }}
                      />
                    </span>
                  </MenuLink>
                </Menu.Item>
              </div>
            );
          })}
      </Menu.Items>
    </Menu>
  );
};
