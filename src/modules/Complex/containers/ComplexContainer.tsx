import { IComplexContainerProps } from "./_interfaces";
import { useTranslation } from "next-i18next";
import { motion as m } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { PageTitle } from "@/components/PageTitle";
import { LinkWithActive } from "@/UI/Link";

export const ComplexContainer = ({
  groups,
  complexes,
}: IComplexContainerProps) => {
  const { t } = useTranslation();
  const {
    query: { group },
  } = useRouter();

  return (
    <div className="h-full overflow-scroll no-scrollbar">
      <div className="pt-2 px-2">
        <PageTitle title="common.complex" className="w-[280px] md:w-[340px] " />
      </div>
      <div className="flex flex-col md:flex-row mt-2 px-2">
        <m.div
          initial={{ x: "100%", opacity: "0" }}
          whileInView={{ x: "0%", opacity: "1" }}
          viewport={{ once: true }}
          transition={{ duration: "0.75", ease: "easeOut" }}
          className="flex flex-col lg:flex-row max-w-[1500px] w-full ml-auto mr-auto"
        >
          <div className="px-2 md:px-0 mb-2">
            <ul className="mr-4  grid grid-cols-3 lg:grid-cols-1">
              <li className={`text-dark font-comfortaa row-span-2`}>
                <LinkWithActive
                  href={"/complex"}
                  i18nKey={"complex.category.all"}
                  active={!group ? true : false}
                  className="text-base"
                />
              </li>
              {groups &&
                groups.map((item) => {
                  return (
                    <li key={item}>
                      <LinkWithActive
                        href={`/complex/${item}`}
                        i18nKey={`complex.category.${item}`}
                        active={group === item ? true : false}
                        className="text-base"
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="">
            <div className=" grid gap-2 md:gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4">
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
                            src={`/img${imgUrl}.jpg`}
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
                              <p className="break-all font-comfortaa text-xl">
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
        </m.div>
      </div>
    </div>
  );
};
