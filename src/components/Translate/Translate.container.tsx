import { useTranslate } from "@/global/hooks";
import { TTranslateProps } from "./_types";
import { cnm } from "@/global/utils";

export const Translate = ({
  i18nKey,
  as: Tag = "span",
  className,
}: TTranslateProps) => {
  const { text } = useTranslate(i18nKey || "");

  return <Tag className={cnm(className)}>{text}</Tag>;
};
