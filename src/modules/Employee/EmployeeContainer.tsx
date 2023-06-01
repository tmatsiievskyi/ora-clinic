import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar2";
import Image from "next/image";
import { IEmployeeContainerProps } from "./_interfaces";
import { useTranslation } from "next-i18next";
import { EmployeeProfile } from "./EmployeeProfile";
import Link from "next/link";
import { useDeviceSize } from "@/global/hooks";

export const EmployeeContainer = ({
  groupedEmployees,
  employee,
}: IEmployeeContainerProps) => {
  const { t } = useTranslation("common");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [width] = useDeviceSize();

  const handleSideBarOpen = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!width) return;

    if (width > 640) {
      setIsSideBarOpen(true);
    } else {
      setIsSideBarOpen(false);
    }
  }, [width]);

  return (
    <div className="h-full flex relative rounded-lg">
      <Sidebar
        title="common.employees.inOraShort"
        isOpen={isSideBarOpen}
        handleOpen={handleSideBarOpen}
      >
        <>
          {groupedEmployees &&
            groupedEmployees.map((item) => {
              return (
                <div key={item._id}>
                  <h4
                    className={`${
                      isSideBarOpen ? "justify-start" : "justify-center"
                    } bg-lightShade sm:pl-2 flex items-center py-1 font-comfortaa text-base`}
                  >
                    <Image
                      src={`/img/svg/${item._id}.svg`}
                      width={30}
                      height={30}
                      alt="icon"
                      className={`mr-1`}
                    />
                    {isSideBarOpen && (
                      <span>{t(`services.title.${item._id}`)}</span>
                    )}
                  </h4>
                  <ul className="font-comfortaa">
                    {item.data.map((employee, index) => {
                      const {
                        _id,
                        firstName,
                        lastName,
                        surname,

                        smImgUrl,
                        position,
                      } = employee;
                      return (
                        <li key={_id.toString()} className="w-full ">
                          <span
                            className={`flex items-center ${
                              index < item.data.length - 1 ? "border-b" : null
                            } border-lightShade py-2`}
                          >
                            <Link
                              href={`/employee/${_id}`}
                              className="flex items-center w-full justify-center"
                            >
                              <Image
                                height={1000}
                                width={1000}
                                src={`/img${smImgUrl}`}
                                alt="Doctor Image"
                                priority
                                className={`${
                                  isSideBarOpen ? "mx-2" : "mx-[10px]"
                                } h-[60px] w-[60px]  object-cover object-top bg-gradient-to-br from-grey to-lightShade to-80% rounded-full`}
                              />
                              {isSideBarOpen && (
                                <span className="font-helveticThin text-dark min-w-[200px]">
                                  <p>{t(`${lastName}`)}</p>
                                  <p>
                                    {t(`${firstName}`)} {t(`${surname}`)}
                                  </p>
                                  <p className="hidden bg-primary text-center rounded-lg font-helveticLight break-all  ">
                                    <span className=" text-light p-2">
                                      {t(`position.${position}`)}
                                    </span>
                                  </p>
                                </span>
                              )}
                            </Link>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
        </>
      </Sidebar>
      <div className="h-full w-full pl-[90px]  md:pl-0 rounded-lg">
        <EmployeeProfile employee={employee} />
      </div>
    </div>
  );
};
