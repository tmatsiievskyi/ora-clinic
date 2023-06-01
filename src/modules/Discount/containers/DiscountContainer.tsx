import { PageTitle } from "@/components/PageTitle";
import { Slider, SliderItem } from "@/components/Slider";
import { IDiscountModel } from "@/global/models/_interfaces";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export const DiscountContainer = ({
  discounts,
}: {
  discounts: IDiscountModel[];
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="h-full overflow-scroll no-scrollbar flex flex-col">
      <div className="pt-2 px-2 pb-2">
        <PageTitle
          title="common.discount"
          className="w-[280px] md:w-[340px] "
        />
      </div>
      <div
        className={`flex relative flex-1 justify-center items-end flex-col  max-w-[1000px] px-2 w-full h-full ml-auto mr-auto`}
      >
        <Slider arrowsColor="primary">
          {discounts.map((item) => {
            return (
              <SliderItem key={item._id.toString()}>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 max-h-[260px] md:max-h-[620px]">
                    <Image
                      src={`/img/discounts/${item._id}.jpg`}
                      alt="Doctors"
                      priority
                      width={2000}
                      height={2000}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "relative",
                        objectPosition: "center top",
                        top: "0",
                        left: "0",
                        borderRadius: "9px",
                      }}
                      className="z-10"
                    />
                  </div>

                  <div className="z-20 relative text-dark flex flex-col  py-2">
                    <p className="text-2xl mb-2">{t(`${item.title}`)}</p>
                    <p className="text-sm">{t(`${item.description}`)}</p>
                  </div>
                </div>
              </SliderItem>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
