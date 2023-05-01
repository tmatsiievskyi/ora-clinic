import Link from "next/link";
import { ILinkWithActiveProps } from "./_interfaces";
import { useTranslation } from "next-i18next";

export const LinkWithActive = ({
  active,
  href,
  i18nKey,
  className,
}: ILinkWithActiveProps) => {
  const { t } = useTranslation();

  return (
    <Link
      href={href}
      className={`${active ? "active" : null} 
        font-helveticLight [&.active]:font-helveticRegular [&.active]:before:block [&.active]:before:absolute [&.active]:before:bottom-[1px] [&.active]:before:left-0 [&.active]:before:w-full [&.active]:before:h-[1px] [&.active]:before:bg-primary [&.active]:relative [&.active]:inline-block
        before:block before:absolute before:bottom-[2px] before:left-1/2 before:w-0 before:h-[1px] before:bg-primary relative inline-block
       hover:before:w-full hover:before:left-0 before:ease-in before:duration-300 ${className}`}
    >
      {t(`${i18nKey}`)}
    </Link>
  );
};
