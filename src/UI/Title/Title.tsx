import { styles } from "@/styles/styles";
import { DefaultTFuncReturn } from "i18next";

export const Title = ({
  children,
  className,
}: {
  children: DefaultTFuncReturn | string;
  className?: string;
}) => {
  return (
    <h3 className={`${styles.heading3} ${className} text-dark`}>{children}</h3>
  );
};
