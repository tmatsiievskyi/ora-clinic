import { useEffect, useRef, useState, MutableRefObject, FC } from "react";
import { PageTitle } from "@/components/PageTitle";
import { IServiceContainerProps } from "./_interfaces";
import { motion as m, AnimatePresence } from "framer-motion";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { styles } from "@/styles/styles";
import { EmployeeComponent } from "@/components/EmployeeComplonent";
import { Modal } from "@/components/Modal";
import Link from "next/link";
import { useRouter } from "next/router";

export const ServiceContainer = ({
  services,
  service,
}: IServiceContainerProps) => {
  const [itemsWidth, setItemsWidth] = useState<number>(0);
  const [showAll, setShowAll] = useState(false);
  const sliderRef = useRef() as MutableRefObject<HTMLInputElement>;
  const isDragging = useRef(false);
  const { t } = useTranslation();
  const { employee, label, description } = service || {};
  const router = useRouter();

  useEffect(() => {
    if (!sliderRef.current) return;
    setItemsWidth(
      sliderRef?.current.scrollWidth - sliderRef?.current.offsetWidth,
    );
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="pt-2 px-2">
        <PageTitle title="common.service" className="w-[280px] md:w-[340px] " />
      </div>
      <div className=" flex flex-1 flex-col justify-between my-2 px-2 ">
        <div className="flex-[1_1_auto] h-0 overflow-scroll no-scrollbar min-h-0">
          {service && (
            <div
              className={`flex flex-col-reverse  md:flex-row ${styles.container} ml-auto mr-auto`}
            >
              <div className="w-full mt-2 md:mt-0 md:w-1/2 pr-4">
                <p className="font-comfortaa text-xl leading-7">
                  {t(`${label}`)}
                </p>
                <div className="divide-y h-[1px] bg-gray-200 my-2"></div>
                <p className="text-base text-dark font-comfortaa">
                  {t(`${description}`)}
                </p>
                <div className="divide-y h-[1px] bg-gray-200 my-2"></div>

                {employee && (
                  <>
                    <p className="font-comfortaa text-xl">Лікарі:</p>
                    <ul>
                      {employee.map((item, index) => {
                        return (
                          <li
                            key={item._id.toString()}
                            className={`flex items-center ${
                              index + 1 < employee.length ? "mb-2" : "mb-0"
                            }`}
                          >
                            <Link href={`/employee/${item._id}`}>
                              <EmployeeComponent
                                imgUrl={`/img${item.smImgUrl}`}
                                firstName={item.firstName}
                                lastName={item.lastName}
                                surname={item.surname}
                                position={item.position}
                                className="[&>img]:mr-2"
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
              <div className="w-full md:w-1/2 relative min-h-[400px]">
                <Image
                  src={`/img${service.imgUrl}.jpg`}
                  width={1000}
                  height={1000}
                  alt={"service image"}
                  className="absolute h-full w-auto object-cover rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
        <m.div
          onClick={() => setShowAll(true)}
          className="font-comfortaa py-1 text-center text-xl my-2 border-gray-600 border-[0.5px] rounded-lg cursor-pointer"
        >
          {t("common.showAllServices")}
        </m.div>
        <m.div
          ref={sliderRef}
          className="h-[200px] cursor-grab flex overflow-hidden"
        >
          <m.div
            drag="x"
            dragConstraints={{ right: 0, left: -itemsWidth }}
            className="flex"
            onDragStart={() => {
              isDragging.current = true;
            }}
            onDragEnd={() => {
              setTimeout(() => {
                isDragging.current = false;
              }, 150);
            }}
          >
            {services &&
              services.map((item, index) => {
                return (
                  <div
                    key={item._id.toString()}
                    onClick={() => {
                      if (isDragging.current) return;
                      //   setActiveItem(item);
                      router.push(`/service/${item._id}`);
                    }}
                    className={`${!index && "first"}
                          ${
                            item._id === (service && service._id)
                              ? "active"
                              : null
                          }
                        relative min-w-[300px] bg-lightShade [&.first]:ml-0 ml-2 rounded-lg
                        p-4 flex flex-col justify-between h-full [&.active]:bg-primary z-10`}
                  >
                    <p
                      className={`${
                        item._id === (service && service._id) ? "active" : null
                      }  text-dark [&.active]:text-light font-comfortaa text-2xl`}
                    >
                      {t(`${item.label}`)}
                    </p>
                    <p></p>
                    <div className="flex justify-between items-end">
                      <span
                        className={`${
                          item._id === (service && service._id)
                            ? "active"
                            : null
                        } text-gray-600 w-[45px] [&.active]:text-light [&.active]:border-light h-[45px] rounded-full border-[0.5px] border-gray-600 flex items-center justify-center`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                          />
                        </svg>
                      </span>
                      <span
                        className={`${
                          item._id === (service && service._id)
                            ? "active"
                            : null
                        } [&.active]:text-light text-gray-600 font-oswald text-5xl`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
          </m.div>
        </m.div>
      </div>
      {services && (
        <AnimatePresence initial={false} mode="wait">
          {showAll && (
            <Modal
              isOpen={showAll}
              onClose={() => setShowAll(false)}
              bodyStyle="max-w-[90%] relative md:max-w-[85%] px-2 bg-light rounded-lg"
            >
              <>
                <p
                  onClick={() => setShowAll(true)}
                  className="font-comfortaa my-3 text-center text-3xl"
                >
                  {t("common.allService")}
                </p>
                <span
                  className="absolute top-1 right-1"
                  onClick={() => setShowAll(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:lg:grid-cols-6">
                  {services &&
                    services.map((item) => {
                      return (
                        <div
                          key={item._id.toString()}
                          className="min-h-[250px] relative w-full h-full flex items-end p-2 group overflow-hidden cursor-pointer"
                        >
                          <Link href={`service/${item._id}`} className="w-full">
                            <Image
                              width={350}
                              height={350}
                              src={`/img${item.imgUrl}.jpg`}
                              alt="Service img"
                              priority={true}
                              className="w-full h-full object-cover rounded-lg absolute top-0 left-0"
                            />
                            <div
                              className="p-2 text-light text-xl font-comfortaa min-h-[25%] bg-dark/50 w-full rounded-lg 
            relative z-10 flex flex-col justify-between group-hover:bg-primary/70 group-hover:min-h-[25%] ease-in-out duration-1000"
                            >
                              <span>{t(item.label)}</span>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </>
            </Modal>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
