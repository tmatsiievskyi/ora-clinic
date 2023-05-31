import { defaultMetaProps } from "@/components/Meta/Meta";
import { PageTitle } from "@/components/PageTitle";
import { PageWrapper } from "@/components/PageWrapper";
import { getAllDiscounts } from "@/global/api/discount-api";
import { IDiscountModel } from "@/global/models/_interfaces";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Slider, SliderItem } from "@/components/Slider";

interface IDiscountProps {
  discounts: IDiscountModel[] | null;
}

const Discount: NextPage<IDiscountProps> = ({ discounts }) => {
  const { t } = useTranslation("common");

  if (!discounts) return null;

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<IDiscountProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const reqForDiscounts = await getAllDiscounts();

  const { data: discounts } = reqForDiscounts;

  const ogUrl = "https://oramedcentr.com.ua/discount";

  const meta = {
    ...defaultMetaProps,
    title: "ОРА - Знижки",
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      meta,
      discounts: discounts ? JSON.parse(JSON.stringify(discounts)) : null,
    },
  };
};

export default Discount;
