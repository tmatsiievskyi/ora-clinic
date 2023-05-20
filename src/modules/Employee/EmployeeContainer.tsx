import { useState } from "react";
import { Sidebar } from "@/components/Sidebar2";
import Image from "next/image";
import { IEmployeeContainerProps } from "./_interfaces";
import { useTranslation } from "next-i18next";
import { styles } from "@/styles/styles";
import { EmployeeProfile } from "./EmployeeProfile";
import Link from "next/link";

export const EmployeeContainer = ({
  groupedEmployees,
  employee,
}: IEmployeeContainerProps) => {
  const { t } = useTranslation("common");
  const { position, imgUrl, firstName, lastName, surname } = employee || {};
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const handleSideBarOpen = () => {
    setIsSideBarOpen((prev) => !prev);
  };

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
                    } bg-lightShade sm:pl-2 flex items-center py-1 font-helveticLight text-base`}
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
                  <ul className="font-helveticThin">
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
                              className="flex items-center"
                            >
                              <Image
                                height={1000}
                                width={1000}
                                src={`/img${smImgUrl}`}
                                alt="Doctor Image"
                                priority
                                className={`w-[auto] ${
                                  isSideBarOpen ? "mx-2" : "mx-[10px]"
                                } h-[60px] object-cover object-top bg-gradient-to-br from-grey to-lightShade to-80% rounded-full`}
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
      <div className="h-full w-full ml-[90px] sm:ml-0 rounded-lg">
        <EmployeeProfile employee={employee} />
      </div>
    </div>
  );
};