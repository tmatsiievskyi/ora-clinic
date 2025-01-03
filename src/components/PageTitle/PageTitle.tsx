import { useTranslation } from "next-i18next";

export const PageTitle = ({
  title,
  titlePrimary,
  className,
}: {
  title: string;
  titlePrimary?: string;
  className?: string;
}) => {
  const { t } = useTranslation("common");

  return (
    <div className={`${className} `}>
      <p className="text-2xl leading-6 text-dark mb-1 font-comfortaa">
        {t(`${title}`)}
      </p>
      <p className="text-primary text-2xl leading-6 mb:mt-2 font-comfortaa">
        {titlePrimary ? t(`${titlePrimary}`) : t("common.name")}
      </p>
    </div>
  );
};
