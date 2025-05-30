import { useState, useEffect } from "react";
import { IComplexModel, ISubServiceModel } from "@/global/models/_interfaces";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useDeviceSize } from "@/global/hooks";
import { CustomDisclosure } from "@/components/Disclosure";
import { PageTitle } from "@/components/PageTitle";
import { styles } from "@/styles/styles";
import { Trans } from "react-i18next";

export const ComplexItemChildContainer = ({
  complex,
}: {
  complex: Omit<IComplexModel, "examination"> & {
    examination: ISubServiceModel[] | null;
    modifiedPrice: number;
    modifiedFamDocPrice: number;
  };
}) => {
  const {
    imgUrl,
    label,
    description,
    analyses,
    examination,
    consultations,
    modifiedFamDocPrice,
    priceFamilyDoctor,
    price,
    modifiedPrice,
    items,
  } = complex || {};
  const { t } = useTranslation();
  const [width] = useDeviceSize();
  const [isOpenDisclosure, setIsOpenDisclosure] = useState<boolean | null>(
    null,
  );

  const hasColono = label.includes("40+");

  useEffect(() => {
    if (!width) return;

    if (width > 640) {
      setIsOpenDisclosure(true);
    } else {
      setIsOpenDisclosure(false);
    }
  }, [width]);

  return (
    <div className="h-full flex flex-col overflow-scroll no-scrollbar">
      <div className="pt-2 px-2">
        <PageTitle
          title="common.complex.item"
          titlePrimary={label}
          className="w-full"
        />
      </div>
      <div className="mt-2 px-2 pb-2 flex-1  flex flex-col md:flex-row">
        <div className="basis-2/5">
          <Image
            src={`/img${imgUrl}`}
            width={1500}
            height={1500}
            alt={"complex image"}
            style={{
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              objectFit: "cover",
              borderRadius: "0.5rem",
            }}
            priority={true}
          />
        </div>
        <div className="basis-3/5 md:px-0 md:pl-2 h-full">
          <div className="flex flex-col h-full">
            <div className="font-comfortaa text-dark mt-2 md:mt-0 mb-2 md:mb-4 leading-5 [&>strong]:text-primary [&>ul]:list-disc [&>ul]:mt-2 [&>ul]:pl-4 [&>ul]:space-y-2">
              <Trans
                i18nKey={description}
                components={{
                  strong: <strong />,
                  em: <em />,
                  ul: <ul />,
                  li: <li />,
                }}
              />
              {/* {t(description)} */}
            </div>

            <div className="flex-grow">
              <div
                className={`grid  gap-2 ${
                  items?.length === 1
                    ? "grid-cols-1"
                    : items?.length === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {typeof isOpenDisclosure === "boolean" &&
                  items?.map((item) => {
                    return (
                      <CustomDisclosure
                        key={item.label}
                        buttonText={item.label}
                        items={item.services}
                        group="subService"
                        defaultOpen={isOpenDisclosure}
                        showPrice={false}
                        listItemClassNames={`grid gap-0 py-1 text-sm text-gray-500 font-comfortaa border-b-[1px] border-lightShade px-2 grid-cols-4 [&>*:nth-child(1)]:col-span-3 [&>*:nth-child(2)]:col-span-1 [&>*:nth-child(2)]:text-right [&>*:nth-child(1)]:flex items-center`}
                        buttonClassNames={`${styles.gradientR} text-light px-4 py-2 text-left text-sm font-comfortaa`}
                        additionalElement={
                          <div>
                            <p className="font-oswald text-xl text-right text-gray-700">
                              <span className="text-sm md:text-base text-primary">
                                {t("complex.priceFamilyDoctor")}
                              </span>{" "}
                              <span className="text-lg text-primary">
                                {item.priceFamilyDoctor}{" "}
                              </span>
                              <span className="text-base text-primary">
                                {t("common.currency.grn")}
                              </span>
                            </p>
                            <p className="font-oswald text-2xl text-right text-gray-700">
                              <span className="text-xl">
                                {t("common.item.price")}
                              </span>{" "}
                              <span>{item.price}</span>
                              <span>{t("common.currency.grn")}</span>
                            </p>
                          </div>
                        }
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
