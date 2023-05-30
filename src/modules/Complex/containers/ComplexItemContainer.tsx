import { useState, useEffect } from "react";
import { IComplexModel } from "@/global/models/_interfaces";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useDeviceSize } from "@/global/hooks";
import { CustomDisclosure } from "@/components/Disclosure";
import { PageTitle } from "@/components/PageTitle";

export const ComplexItemContainer = ({
  complex,
}: {
  complex: IComplexModel | null;
}) => {
  const {
    imgUrl,
    label,
    description,
    analyses,
    examination,
    consultations,
    priceFamilyDoctor,
    price,
  } = complex || {};
  const { t } = useTranslation();
  const [width] = useDeviceSize();
  const [isOpenDisclosure, setIsOpenDisclosure] = useState<boolean | null>(
    null,
  );

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
            <p className="font-comfortaa text-dark mt-2 md:mt-0 mb-2 md:mb-4 leading-5">
              {t(`${description}`)}
            </p>

            <div className="flex-grow">
              <div className="grid   gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                  <>
                    {analyses && typeof isOpenDisclosure === "boolean" ? (
                      <CustomDisclosure
                        buttonText="common.analyses"
                        items={analyses}
                        group="subService"
                        defaultOpen={isOpenDisclosure}
                        buttonClassNames="bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                        listClassNames="px-4 pt-4 pb-2 text-sm text-gray-500 font-helveticRegular"
                      />
                    ) : null}
                  </>
                }
                {
                  <>
                    {examination && typeof isOpenDisclosure === "boolean" ? (
                      <CustomDisclosure
                        buttonText="common.examination"
                        items={examination}
                        group="subService"
                        defaultOpen={isOpenDisclosure}
                        buttonClassNames="bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                        listClassNames="px-4 pt-4 pb-2 text-sm text-gray-500 font-helveticRegular"
                      />
                    ) : null}
                  </>
                }
                {
                  <>
                    {consultations && typeof isOpenDisclosure === "boolean" ? (
                      <CustomDisclosure
                        buttonText="common.consultations"
                        items={consultations}
                        group="subService"
                        defaultOpen={isOpenDisclosure}
                        buttonClassNames="bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                        listClassNames="px-4 pt-4 pb-2 text-sm text-gray-500 font-helveticRegular"
                      />
                    ) : null}
                  </>
                }
              </div>
            </div>
            <div>
              <p className="font-oswald text-2xl text-right text-gray-700">
                <span className="text-base text-primary">
                  {t("complex.priceFamilyDoctor")}
                </span>{" "}
                <span className="text-lg text-primary">
                  {priceFamilyDoctor}{" "}
                </span>
                <span className="text-base text-primary">
                  {t("common.currency.grn")}
                </span>
              </p>
              <p className="font-oswald text-2xl text-right text-gray-700">
                <span className="text-xl">{t("common.item.price")}</span>{" "}
                <span>{price}</span>
                <span>{t("common.currency.grn")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
