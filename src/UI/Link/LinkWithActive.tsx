import Link from "next/link";
import { ILinkWithActiveProps } from "./_interfaces";
import { useTranslation } from "next-i18next";
import { styles } from "@/styles/styles";

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
      className={`${className} ${active ? "active" : null} 
        font-helveticThin [&.active]:font-helveticLight ${styles.linkHover} `}
    >
      {t(`${i18nKey}`)}
    </Link>
  );
};
