import { useState } from "react";
import { IEmployeeModel } from "@/global/models/_interfaces";
import { styles } from "@/styles/styles";
import { useTranslation } from "next-i18next";
import { tabs } from "./data";
import Image from "next/image";
import { BadgeCheck } from "@/UI/BadgeCheck";
import { AnimatedTextCharacter } from "@/components/AnimatedTextCharacter";

export const EmployeeProfile = ({
  employee,
}: {
  employee: IEmployeeModel | null;
}) => {
  const { t } = useTranslation("common");
  const { position, _id, lastName, firstName, surname, imgUrl, illness } =
    employee || {};
  const [activeTab, setActiveTab] = useState("profile");

  const content = () => {
    if (activeTab === "profile") {
      return (
        <div className=" text-dark break-word">
          <p className="mb-2 break-word">{t(`about.start.${_id}`)}</p>
          <p className="break-word">{t(`about.end.${_id}`)}</p>
        </div>
      );
    }
    if (activeTab === "skills") {
      return (
        <ul className=" text-dark  my-4">
          {illness?.map((item, index) => {
            return (
              <li key={index}>
                <BadgeCheck className="inline text-primary" />{" "}
                {t(`illness.${item}`)}
              </li>
            );
          })}
        </ul>
      );
    }
    if (activeTab === "contact") {
      return <p>Contact</p>;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="h-80  bg-gradient-to-r rounded-bl-lg from-grey to-lightShade to-90% ">
        <div
          className={`${styles.container} h-full flex justify-between mr-auto relative`}
        >
          <div
            className={`${styles.heading3} text-light mt-2 ml-2 md:mt-4 md:ml-4`}
          >
            {lastName && (
              <AnimatedTextCharacter
                // className=" flex-nowrap"
                i18nKey={lastName}
                type="right"
              />
            )}
            {firstName && (
              <AnimatedTextCharacter
                // className=" flex-nowrap"
                i18nKey={firstName}
                type="right"
              />
            )}
            {surname && (
              <AnimatedTextCharacter
                // className=" flex-nowrap"
                i18nKey={surname}
                type="right"
              />
            )}
          </div>
          {/* <div className="w-[50%] relative"> */}
          <Image
            height={1000}
            width={1000}
            src={`/img${imgUrl}`}
            alt="Doctor Image"
            priority
            className=" w-auto absolute right-0 bottom-0 h-full object-cover object-top rounded-lg"
          />
          {/* </div> */}
        </div>
      </div>
      <div
        className={`${styles.container} p-2 md:p-4 rounded-lg flex-1  h-[calc(100%-20rem)] overflow-scroll no-scrollbar`}
      >
        <p className={`${styles.heading3} break-all`}>
          {t(`position.${position}`)}
        </p>
        <div className="mb-6 mt-3 flex justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`${
                tab.name === activeTab
                  ? "border-primary text-dark"
                  : "border-transparent text-gray-400"
              }
            mr-2 md:mr-4 ease-in duration-300 whitespace-nowrap py-1 md:py-2 px-1 border-b-2 font-medium text-sm md:text-base font-comfortaa`}
              onClick={() => setActiveTab(tab.name)}
            >
              {t(`employee.tab.${tab.name}`)}
            </button>
          ))}
        </div>
        <div className="font-comfortaa">{content()}</div>
      </div>
    </div>
  );
};
