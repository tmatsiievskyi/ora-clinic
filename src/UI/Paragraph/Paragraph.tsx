import { styles } from "@/styles/styles";
import { DefaultTFuncReturn } from "i18next";

export const Paragraph = ({
  children,
  className,
}: {
  children: DefaultTFuncReturn | string | JSX.Element;
  className?: string;
}) => {
  return (
    <p className={`${styles.paragraph} ${className} text-dark`}>{children}</p>
  );
};
