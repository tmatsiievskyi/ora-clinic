import { useEffect, useRef, useState, MutableRefObject, FC } from "react";
import { PageTitle } from "@/components/PageTitle";
import { IServiceContainerProps } from "./_interfaces";
import { motion as m, AnimatePresence } from "framer-motion";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { EmployeeComponent } from "@/components/EmployeeComplonent";
import { Modal } from "@/components/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRight } from "@/UI/Arrows";

export const ServiceContainer = ({
  services,
  service,
}: IServiceContainerProps) => {
  const [itemsWidth, setItemsWidth] = useState<number>(0);
  const [showAll, setShowAll] = useState(false);
  const sliderRef = useRef() as MutableRefObject<HTMLInputElement>;
  const isDragging = useRef(false);
  const { t } = useTranslation();
  const { employee, label, description, mainItems, name } = service || {};
  const router = useRouter();

  useEffect(() => {
    if (!sliderRef.current) return;
    setItemsWidth(
      sliderRef?.current.scrollWidth - sliderRef?.current.offsetWidth,
    );
  }, []);

  return (
    <div className="h-full flex flex-col bg-lightShade">
      <div className="flex flex-1 flex-col justify-between bg-lightShade">
        <div className="flex-[1_1_auto] h-0 overflow-scroll no-scrollbar min-h-0">
          <div className="px-2 bg-light mb-2 rounded-lg h-[72px] flex items-center">
            <PageTitle
              title="common.service"
              className="w-[280px] md:w-[340px] "
            />
          </div>
          {service && (
            <div
              className={`flex flex-col-reverse mt-2 md:flex-row  ml-auto mr-auto`}
            >
              <div className="w-full grid md:grid-cols-6 gap-2">
                <div className="w-full flex items-center justify-center bg-light rounded-lg pb-1 col-span-6 md:col-span-4">
                  <div>
                    <Image
                      src={`/img/svg/${name}.svg`}
                      width={80}
                      height={80}
                      alt="icon"
                      className={`ml-auto mr-auto mb-1`}
                    />
                    <p className=" font-comfortaa text-center text-dark font-bold text-2xl leading-7">
                      {t(`${label}`)}
                    </p>
                  </div>
                </div>
                {/* <div className="divide-y h-2 bg-lightShade"></div> */}
                <div className="w-full relative min-h-[250px] md:h-[300px] rounded-lg col-span-6 md:col-span-2">
                  <Image
                    src={`/img${service.imgUrl}.jpg`}
                    width={1000}
                    height={1000}
                    alt={"service image"}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>

                {/* <div className="divide-y h-2 bg-lightShade"></div> */}
                <p className="text-lg text-dark font-helveticLight px-2 bg-light rounded-lg py-2 col-span-6 md:col-span-3">
                  {t(`${description}`)}
                </p>
                {employee && employee.length > 0 && (
                  <div className="bg-light p-2 rounded-lg col-span-6 md:col-span-3">
                    <p className="font-comforta text-2xl text-dark mb-2">
                      Лікарі:
                    </p>
                    <ul>
                      {employee.map((item, index) => {
                        return (
                          <li
                            key={item._id.toString()}
                            className={`flex items-center ${
                              index + 1 < employee.length ? "mb-4" : "mb-2"
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
                  </div>
                )}
                {mainItems && mainItems.length > 0 && (
                  <div className="bg-light p-2 pb-2 rounded-lg col-span-6">
                    <h3 className="font-comforta text-2xl text-dark mb-2">
                      Основні напрямки:
                    </h3>
                    <ul className="grid grid-cols-3 gap-2">
                      {mainItems.map((mainItem) => {
                        return (
                          <Link
                            href={`/price?search=${t(`${label}`)}`}
                            key={mainItem}
                            className="col-span-3 md:col-span-1"
                            onClick={(e) =>
                              label === "services.title.childDoctor" &&
                              e.preventDefault()
                            }
                          >
                            <li className="border flex items-center justify-between h-full border-primary/80 rounded-md p-2 text-dark text-lg ">
                              <span>{t(mainItem)}</span>
                              {!(label === "services.title.childDoctor") && (
                                <span className="text-sm flex justify-center items-center">
                                  {t("common.price")}
                                  <ArrowRight classNameArrow="w-4 h-4 text-primary" />
                                </span>
                              )}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <m.div
                  onClick={() => setShowAll(true)}
                  className="font-helveticLight py-1 text-center text-xl border-dark text-dark border-[0.5px] rounded-lg cursor-pointer bg-light col-span-6"
                >
                  {t("common.showAllServices")}
                </m.div>
              </div>
            </div>
          )}
        </div>
        <m.div
          ref={sliderRef}
          className="h-[150px] md:h-[200px] cursor-grab flex overflow-scroll no-scrollbar mt-2"
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
                      router.push(`/service/${item._id}`);
                    }}
                    className={`${!index && "first"}
                          ${
                            item._id === (service && service._id)
                              ? "active"
                              : null
                          }
                        relative min-w-[300px] bg-light [&.first]:ml-0 ml-2 rounded-lg
                        p-4 flex flex-col justify-between h-full [&.active]:bg-primary z-10`}
                  >
                    <p
                      className={`${
                        item._id === (service && service._id) ? "active" : null
                      }  text-dark [&.active]:text-light font-helveticLight text-2xl`}
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
              bodyStyle="max-w-[90%] no-scrollbar relative md:max-w-[85%] px-2 bg-light rounded-lg"
            >
              <>
                <p
                  onClick={() => setShowAll(true)}
                  className="font-helveticThin my-3 text-center text-3xl text-dark"
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
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
                <div className="grid  gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:lg:grid-cols-6 bg-lightShade p-2">
                  {services &&
                    services.map((item) => {
                      return (
                        <div
                          key={item._id.toString()}
                          className="min-h-[200px] relative w-full h-full flex items-end p-2 group overflow-hidden cursor-pointer bg-light rounded-lg"
                        >
                          <Link
                            href={`/service/${item._id}`}
                            className="w-full h-full flex flex-col justify-center items-center"
                            onClick={() => setShowAll(false)}
                          >
                            <Image
                              width={60}
                              height={60}
                              src={`/img/svg/${item.name}.svg`}
                              alt="Service img"
                              priority={true}
                              className=" rounded-lg"
                            />
                            <div
                              className="p-2 text-dark text-xl font-helveticLight min-h-[25%] w-full rounded-lg 
            relative z-10 flex flex-col justify-between group-hover:bg-primary/70 group-hover:min-h-[25%] group-hover:text-light ease-in-out duration-300"
                            >
                              <span className=" break-words text-center">
                                {t(item.label)}
                              </span>
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
