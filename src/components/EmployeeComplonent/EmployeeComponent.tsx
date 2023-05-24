import Image from "next/image";
import { IEmployeeComponentProps } from "./_interfaces";
import { useTranslation } from "next-i18next";

export const EmployeeComponent = ({
  imgUrl,
  firstName,
  lastName,
  surname,
  position,
  className,
}: IEmployeeComponentProps) => {
  const { t } = useTranslation();

  return (
    <span className={`${className} flex items-center`}>
      <Image
        height={1000}
        width={1000}
        src={imgUrl}
        alt="Doctor Image"
        priority
        className={`w-[auto] "mx-2" h-[60px] object-cover object-top bg-gradient-to-br from-grey to-lightShade to-80% rounded-full`}
      />
      <span className="font-helveticThin text-dark min-w-[200px]">
        <p>{t(`${lastName}`)}</p>
        <p>
          {t(`${firstName}`)} {t(`${surname}`)}
        </p>
        <p className="hidden bg-primary text-center rounded-lg font-helveticLight break-all  ">
          <span className=" text-light p-2">{t(`position.${position}`)}</span>
        </p>
      </span>
    </span>
  );
};
