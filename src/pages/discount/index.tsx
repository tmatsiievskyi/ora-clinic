import { defaultMetaProps } from "@/components/Meta/Meta";
import { PageWrapper } from "@/components/PageWrapper";
import { getAllDiscounts } from "@/global/api/discount-api";
import { IDiscountModel } from "@/global/models/_interfaces";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface IDiscountProps {
  discounts: IDiscountModel[] | null;
}

const Discount: NextPage<IDiscountProps> = ({ discounts }) => {
  return (
    <PageWrapper>
      <p>Discount</p>
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
