import { useState, useEffect } from "react";
import { IEmployeeModel, IServiceModel } from "@/global/models/_interfaces";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useAnimationControls, motion as m, Variants } from "framer-motion";
import { AnimatedTextCharacter } from "@/components/AnimatedTextCharacter";
import { ArrowLeft, ArrowRight } from "@/UI/Arrows";
import { Swapper } from "@/components/Swapper";
import Link from "next/link";
import { styles } from "@/styles/styles";
import { CompWithFramer } from "@/components/CompWithFramer";

export const MainItems = ({
  employees,
  services,
}: {
  employees: IEmployeeModel[] | null;
  services: IServiceModel[] | null;
}) => {
  const { t } = useTranslation("common");
  const [employeeIndex, setEmployeeIndex] = useState(0);
  let activeEmployee = employees && employees[employeeIndex];

  const updateIndex = (newIndex: number) => {
    const numOfChild = employees?.length;
    if (!numOfChild) return;
    if (newIndex < 0) {
      newIndex = numOfChild - 1;
    }
    if (newIndex >= numOfChild) {
      newIndex = 0;
    }
    setEmployeeIndex(newIndex);
  };

  return (
    <div className="md:max-h-[850px]  mt-2 rounded-lg grid grid-rows-6 grid-cols-10 gap-2 [&>div]:rounded-lg ">
      <div className="col-span-10 md:col-span-5 lg:col-span-7 row-span-1 md:row-span-2">
        <CompWithFramer
          delay={0.5}
          duration={0.6}
          from="left"
          className="bg-light h-full w-full rounded-lg p-2"
        >
          <div className="flex flex-col h-full justify-center">
            <p className="text-dark font-comfortaa text-4xl xl:text-7xl mb-2">
              {t("common.item.title.one")}
            </p>
            <p className="text-dark  text-xl leading-6">
              {t("common.item.title.two")}
            </p>
          </div>
        </CompWithFramer>
      </div>

      <div className="min-h-[600px] md:min-h-[400px]  bg-lightShade my-0 md:my-0 col-span-10 md:col-span-5 lg:col-span-3 row-span-5 md:row-span-6 relative rounded-lg overflow-hidden">
        {activeEmployee && (
          <CompWithFramer
            delay={0.5}
            duration={0.6}
            from="right"
            className="h-full w-full rounded-lg"
          >
            <div className="h-full bg-gradient-to-br from-grey to-lightShade relative p-2 z-30 flex flex-col justify-end rounded-lg font-comfortaa text-xl md:text-2xl">
              <div className="relative w-full h-full flex items-center justify-between">
                <ArrowLeft
                  onClick={() => updateIndex(employeeIndex - 1)}
                  classNameArrow="w-14 h-14 text-lightShade"
                  classNameWrapper=" cursor-pointer flex items-center rounded-lg justify-center h-[60px] w-[60px] bg-dark/30 z-40"
                />
                <ArrowRight
                  onClick={() => updateIndex(employeeIndex + 1)}
                  classNameArrow="w-14 h-14 text-lightShade"
                  classNameWrapper="cursor-pointer flex items-center rounded-lg justify-center h-[60px] w-[60px] bg-dark/30 cursor-pointer z-40"
                />
              </div>
              <div className="flex text-2xl flex-col md:flex-row [&>div]:min-h-[50px] md:[&>div]:min-h-[180px] [&>div]:w-full md:[&>div]:w-1/2 [&>div]:p-2">
                <div className="relative flex flex-col justify-between overflow-hidden z-30 md:mr-2 bg-dark/30 rounded-lg text-light">
                  <div>
                    <Link href={`/employee/${activeEmployee._id}`}>
                      <AnimatedTextCharacter
                        i18nKey={activeEmployee.lastName}
                        type="right"
                      />
                      <AnimatedTextCharacter
                        i18nKey={activeEmployee.firstName}
                        type="right"
                      />
                      <AnimatedTextCharacter
                        i18nKey={activeEmployee.surname}
                        type="right"
                      />
                    </Link>
                  </div>
                  <AnimatedTextCharacter
                    i18nKey={`${activeEmployee.position}`}
                    type="right"
                    className="mt-4  text-base md:text-lg break-words"
                  />
                </div>

                <div className="relative mt-2 md:mt-0 flex items-center justify-center flex-col text-center z-30 bg-light/40 rounded-lg text-dark">
                  <Link href="/employee/643de66f65d1bd3016084227">
                    <p className="text-2xl xl:text-3xl font-comfortaa ">
                      {t("common.employees.inOra")}
                    </p>
                    <p className="text-primary text-3xl md:text-4xl leading-5 mt-2  font-normal">
                      {t("common.name")}
                    </p>
                  </Link>
                </div>
              </div>
              <CompWithFramer
                className="h-full w-full absolute t-0 l-0"
                from="scale"
                delay={0.3}
                duration={0.5}
                key={activeEmployee._id.toString()}
              >
                <Image
                  height={1000}
                  width={1000}
                  src={`/img${activeEmployee.imgUrl}`}
                  alt="Doctor Image"
                  className="absolute top-0 left-0 w-full h-full object-cover z-20 object-top"
                />
              </CompWithFramer>
            </div>
          </CompWithFramer>
        )}
      </div>
      <div className="bg-lightShade col-span-10 md:col-span-5 lg:col-span-7 row-span-1 md:row-span-3">
        {services && (
          <CompWithFramer
            delay={0.5}
            duration={0.6}
            from="left"
            className="bg-light h-full w-full rounded-lg p-2"
          >
            <Swapper>
              {services?.map((service) => {
                return (
                  <div
                    className="pb-2 px-2 md:mt-0 h-[200px] md:min-h-full w-[300px] md:w-[350px] lg:w-[400px] cursor-grab mr-2 relative z-40 rounded-lg flex items-end"
                    key={service._id.toString()}
                  >
                    <div className="flex h-full p-2 pt-4 z-30 overflow-hidden w-full shadow-md rounded-lg font-comfortaa">
                      <Link
                        key={service._id.toString()}
                        href={`/service/${service._id}`}
                        className={`h-full w-full pointer-events-none  flex flex-col justify-center items-center`}
                      >
                        <Image
                          width={80}
                          height={80}
                          src={`/img/svg/${service.name}.svg`}
                          alt="Service img"
                          className=" pointer-events-none z-20"
                        />
                        <span className="text-2xl  xl:text-3xl font-comfortaa text-dark text-center break-words">
                          {t(service.label)}
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </Swapper>
          </CompWithFramer>
        )}
      </div>

      <div className="bg-lightShade md:mt-0  col-span-10 md:col-span-5 lg:col-span-7 row-span-1 ">
        <Link href="/service/6475fe5326bf43d0c8a70f64">
          <CompWithFramer
            delay={0.5}
            duration={0.6}
            from="left"
            className="h-full w-full rounded-lg bg-light p-2"
          >
            <div className="h-full flex items-center justify-center flex-col text-center text-dark">
              <p className="text-2xl  xl:text-3xl font-comfortaa">
                {t("common.service.inOra")}
              </p>
              <p className="text-primary text-3xl md:text-4xl leading-5 mt-2  font-normal">
                {t("common.name")}
              </p>
            </div>
          </CompWithFramer>
        </Link>
      </div>
    </div>
  );
};
