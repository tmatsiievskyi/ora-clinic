import { exists } from "i18next";
import { useTranslation } from "next-i18next";

export const useTranslate = (i18nKey: string) => {
  const { t } = useTranslation();

  const hasI18Key = (key: string) => exists(key);
  const getTranslation = (key: string) => t(key);
  const translate = {
    text: getTranslation(i18nKey),
    hasI18Key: hasI18Key(i18nKey),
  };

  return translate;
};
