import { IComplexContainerProps } from "./_interfaces";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { PageTitle } from "@/components/PageTitle";

export const ComplexContainer = ({
  groups,
  complexes,
}: IComplexContainerProps) => {
  const { t } = useTranslation();
  const {
    query: { group },
  } = useRouter();

  return (
    <div className="h-full overflow-scroll no-scrollbar bg-lightShade">
      <div className="px-2 bg-light mb-2 rounded-lg h-[72px] flex items-center">
        <PageTitle title="common.service" className="w-[280px] md:w-[340px] " />
      </div>
      <div className="flex flex-col md:flex-row mt-2">
        <div className="flex flex-col lg:flex-row  w-full">
          <div className="lg:max-w-[300px] min-w-[250px] text-dark rounded-lg mb-2 lg:mb-0 lg:mr-2  bg-light">
            <ul className=" grid grid-cols-3 lg:grid-cols-1 items-center justify-center">
              <Link
                href={"/complex"}
                className="text-xl h-full md:h-auto lg:mb-1"
              >
                <li
                  className={`text-dark h-full flex items-center  justify-center px-1 md:px-3 py-1 text-center md:text-left md:mr-0 font-comfortaa col-span-1 ${
                    !group ? "active" : ""
                  } [&.active]:bg-primary [&.active]:text-white rounded-lg ease-in duration-300 hover:bg-primary/70 hover:text-white`}
                >
                  <span>{t("complex.category.all")}</span>
                </li>
              </Link>
              {groups &&
                groups.map((item) => {
                  return (
                    <Link
                      href={`/complex/${item}`}
                      key={item}
                      className="text-xl h-full md:h-auto  mb-1 md:px-0 ml-1 md:ml-0"
                    >
                      <li
                        className={`text-center h-full flex items-center  justify-center text-dark md:text-left px-6 py-1 ${
                          group === item ? "active" : ""
                        } [&.active]:bg-primary [&.active]:text-white rounded-lg ease-in duration-300 hover:bg-primary/70 hover:text-white`}
                      >
                        <span>{t(`complex.category.${item}`)}</span>
                      </li>
                    </Link>
                  );
                })}
            </ul>
          </div>
          <div>
            <div className="bg-lightShade  flex-grow rounded-lg grid gap-2 md:gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4">
              {complexes &&
                complexes.map((complex) => {
                  const { _id, imgUrl, label } = complex;
                  return (
                    <div
                      key={_id.toString()}
                      className="min-h-[300px] md:min-h-[400px] ease-in-out duration-300 flex flex-col w-full"
                    >
                      <Link
                        href={`/complex/item/${_id}`}
                        className="h-full w-full"
                      >
                        <div className="relative w-full h-full flex items-end p-2 group overflow-hidden">
                          <Image
                            src={`/img${imgUrl}`}
                            width={700}
                            height={700}
                            alt={"service image"}
                            quality="80"
                            priority={true}
                            className="w-full h-full object-cover rounded-lg absolute top-0 left-0 group-hover:scale-125 ease-in-out duration-1000"
                          />
                          <div
                            className="p-2 text-light font-comfortaa min-h-[25%] bg-dark/20 w-full rounded-lg 
            relative z-10 flex flex-col justify-between group-hover:bg-primary/70 group-hover:min-h-[25%] ease-in-out duration-1000"
                          >
                            {label && (
                              <p className=" break-words font-comfortaa text-xl">
                                {t(`${label}`)}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
