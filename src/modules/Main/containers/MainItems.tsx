import { useState, useEffect } from "react";
import { IEmployeeModel } from "@/global/models/_interfaces";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useAnimationControls, motion as m, Variants } from "framer-motion";

export const MainItems = ({
  employees,
}: {
  employees: IEmployeeModel[] | null;
}) => {
  const { t } = useTranslation("common");
  const [employeeIndex, setEmployeeIndex] = useState(0);
  const controls = useAnimationControls();
  let activeEmployee = employees && employees[employeeIndex];

  const animVar: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
  };

  const updateIndex = (newIndex: number) => {
    const numOfChild = employees?.length;
    console.log(numOfChild);
    if (!numOfChild) return;
    if (newIndex < 0) {
      newIndex = numOfChild - 1;
    }
    if (newIndex >= numOfChild) {
      newIndex = 0;
    }
    setEmployeeIndex(newIndex);
  };

  useEffect(() => {
    controls.set({
      opacity: 0,
      // y: 100,
    });
    controls.start((i) => ({
      opacity: 1,
      transition: { delay: i * 0.3, duration: 0.3, ease: "easeInOut" },
    }));
  }, [employeeIndex]);

  return (
    <div className="min-h-full mt-2 rounded-lg grid grid-rows-6 grid-cols-10 gap-2 [&>div]:rounded-lg">
      <div className="bg-primary col-span-10 md:col-span-5 lg:col-span-6 row-span-1"></div>
      <div className="bg-light col-span-10 md:col-span-5 lg:col-span-4 row-span-6 relative bg-gradient-to-br from-grey to-lightShade">
        {activeEmployee && (
          <div className="h-full relative p-2 flex items-end font-helveticLight text-2xl [&>div]:min-h-[180px] [&>div]:w-1/2 [&>div]:p-2">
            <div className="relative flex flex-col justify-between overflow-hidden z-30 mr-2 bg-dark/30 rounded-lg text-light">
              <div>
                <m.p
                  variants={animVar}
                  initial="hidden"
                  custom={1}
                  animate={controls}
                >
                  {t(`common.lastName.${activeEmployee.lastName}`)}
                </m.p>
                <m.p
                  variants={animVar}
                  initial="hidden"
                  custom={2}
                  animate={controls}
                >
                  {t(`common.firstName.${activeEmployee.firstName}`)}
                </m.p>
                <m.p
                  variants={animVar}
                  initial="hidden"
                  custom={3}
                  animate={controls}
                >
                  {t(`common.surname.${activeEmployee.surname}`)}
                </m.p>
              </div>
              <m.p
                variants={animVar}
                initial="hidden"
                custom={1}
                animate={controls}
                className="mt-4 text-lg"
              >
                {t(`common.position.${activeEmployee.position}`)}
              </m.p>
            </div>
            <div className="relative flex items-center justify-center flex-col text-center z-30 bg-light/40 rounded-lg text-dark">
              <p>{t("common.employees.inOra")}</p>
              <p className="text-primary text-4xl font-normal mt-2">
                {" "}
                {t("common.name")}
              </p>
            </div>
            <div
              onClick={() => {
                updateIndex(employeeIndex + 1);
              }}
              className={`flex items-center h-full justify-end cursor-pointer absolute right-0 top-0 z-30`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-14 h-14 text-lightShade`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <div
              onClick={() => {
                updateIndex(employeeIndex - 1);
              }}
              className={`flex items-center h-full justify-start cursor-pointer absolute left-0 top-0 z-30`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-14 h-14 text-lightShade`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>

            <Image
              height={1000}
              width={1000}
              src={`/img${activeEmployee.imgUrl}`}
              alt="Doctor Image"
              className="absolute top-0 left-0 w-full h-full object-cover z-20 object-top"
            />
          </div>
        )}
      </div>
      <div className="bg-blue-200 col-span-10 md:col-span-5 lg:col-span-6 row-span-3"></div>
      <div className="bg-red-200 col-span-10 md:col-span-5 lg:col-span-6 row-span-2"></div>
    </div>
  );
};
