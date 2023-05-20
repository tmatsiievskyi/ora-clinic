import { BadgeCheck } from "@/UI/BadgeCheck";
import { Title } from "@/UI/Title";
import { useTranslation, Trans } from "next-i18next";
import Image from "next/image";
import { IEmployeeItemProps } from "./_interfaces";

export const EmployeeItem = ({ employee, departments }: IEmployeeItemProps) => {
  const { t } = useTranslation("common");
  const { firstName, lastName, surname, imgUrl, position, illness, _id } =
    employee || {};
  return (
    <div className="h-full rounded-lg ">
      <div className="flex">
        <div className="w-1/2">
          <div className="text-lg font-helveticLight text-dark [&>i]:text-primary [&>i]:block">
            <Title className="mb-2 text-dark">{t(`${lastName}`)}</Title>
            <Title className="mb-2 text-dark">{t(`${firstName}`)}</Title>
            <Title className="mb-2 text-dark">{t(`${surname}`)}</Title>
            <p className=" bg-primary text-center rounded-lg font-helveticThin text-xl break-all">
              <span className=" text-light p-2">
                {t(`common.position.${position}`)}
              </span>
            </p>
            <ul className="font-helveticThin text-dark text-lg my-4">
              {illness?.map((item, index) => {
                return (
                  <li key={index}>
                    <BadgeCheck className="inline text-primary" />{" "}
                    {t(`illness.${item}`)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-1/2 ">
          <Image
            height={1000}
            width={1000}
            src={`/img${imgUrl}`}
            alt="Doctor Image"
            priority
            className="w-[auto] max-h-[400px] ml-auto mr-auto object-cover z-20 object-top"
          />
        </div>
      </div>
      <div className=" text-dark">
        <p>{t(`about.start.${_id}`)}</p>
        <p>{t(`about.end.${_id}`)}</p>
      </div>
    </div>
  );
};
