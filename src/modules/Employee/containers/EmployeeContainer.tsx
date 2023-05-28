import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { IEmployeeContainerProps } from "./_interfaces";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export const EmployeeContainer = ({
  departments,
  employees,
}: IEmployeeContainerProps) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { t } = useTranslation("common");
  const {
    query: { department },
  } = useRouter();
  const sideBarData = [
    { key: "all", href: "/employee", i18nKey: "employee.title.all" },
    ...(departments?.map((item) => ({
      key: item,
      href: `/employee/${item}`,
      i18nKey: `employee.title.${item}`,
    })) || []),
  ];

  const handleSideBarOpen = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-end ">
      <div
        //absolute left-4 z-30  md:relative md:left-0  bg-light/80
        className={`
         
         ${
           isSideBarOpen ? "w-[180px]" : "w-[35px]"
         } rounded-lg overflow-hidden mr-2 ease-in duration-300`}
      >
        {sideBarData && (
          <div
            className={`${
              isSideBarOpen ? "w-[180px]" : "w-[35px]"
            } rounded-lg overflow-hidden ease-in duration-300`}
          >
            <Sidebar
              classNameLink="font-comfortaa min-w-[130px] text-base text-dark overflow-x-hidden ml-2"
              classNameBox="flex flex-col rounded-lg rounded-lg  border-primaryLight"
              activeItem={department || "all"}
              items={sideBarData}
              handleOpen={handleSideBarOpen}
              isOpen={isSideBarOpen}
            />
          </div>
        )}
      </div>
      <div className="flex-1 ">
        <div className="grid max-w-[1400px] gap-2 mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {employees?.map((item) => {
            const { firstName, lastName, surname, imgUrl, position, _id } =
              item;
            return (
              <div
                key={_id.toString()}
                className="h-full w-full sm:max-w-[400px] group cursor-pointer flex"
              >
                <Link
                  href={`/employee/item/${_id}`}
                  className="h-full w-full flex flex-col"
                >
                  <div className="h-[350px] sm:h-[420px] rounded-lg flex  items-end relative  overflow-y-hidden">
                    <div className="w-full h-[100%] rounded-lg bg-gradient-to-br from-grey to-lightShade to-90%"></div>
                    <Image
                      height={1000}
                      width={1000}
                      src={`/img${imgUrl}`}
                      alt="Doctor Image"
                      priority
                      className="w-[auto] ml-auto mr-auto max-h-[400px] h-[95%] object-cover z-20 object-bottom ease-in duration-300 absolute inset-x-0 bottom-0 group-hover:scale-[1.1]"
                    />
                  </div>
                  <div className="mt-1 flex-1 flex flex-col justify-between">
                    <div className="break-all text-center text-dark font-comfortaa text-lg pr-2">
                      <p>{t(`${lastName}`)}</p> <span>{t(`${firstName}`)}</span>{" "}
                      <span>{t(`${surname}`)}</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-base bg-primary text-center rounded-lg font-comfortaa mb:text-xl break-all  ">
                        <span className=" text-light p-2">
                          {t(`common.position.${position}`)}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
