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
      <p className="text-xl md:text-2xl md:leading-6 font-helveticThin">
        {t(`${title}`)}
      </p>
      <p className="text-primary text-2xl md:text-3xl mb:mt-2 font-helveticThin">
        {titlePrimary ? t(`${titlePrimary}`) : t("common.name")}
      </p>
    </div>
  );
};
