import { defaultMetaProps } from "@/components/Meta/Meta";
import { PageWrapper } from "@/components/PageWrapper";
import {
  getAllDiscounts,
  getAllDiscountOrderById,
} from "@/global/api/discount-api";
import { IDiscountModel } from "@/global/models/_interfaces";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { DiscountContainer } from "@/modules/Discount/containers";

interface IDiscountProps {
  discounts: IDiscountModel[] | null;
}

const Discount: NextPage<IDiscountProps> = ({ discounts }) => {
  if (!discounts) return null;

  return (
    <PageWrapper>
      <DiscountContainer discounts={discounts} />
    </PageWrapper>
  );
};

export const getStaticPaths = async ({ locales }: GetStaticPropsContext) => {
  const reqForDiscounts = await getAllDiscounts();
  const { data: discounts } = reqForDiscounts;
  const paths = locales
    ? locales.reduce<string[]>((acc, cur) => {
        discounts &&
          discounts.forEach((item) => {
            acc.push(`/${cur}/discount/${item._id}`);
          });
        return acc;
      }, [])
    : discounts &&
      discounts.map((item) => ({
        params: { employeeId: item._id },
      }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IDiscountProps> = async (
  context: GetStaticPropsContext,
) => {
  const { locale, params } = context;
  const { discountId } = params || {};

  if (!discountId) {
    return {
      notFound: true,
    };
  }

  const reqForDiscounts = await getAllDiscountOrderById(discountId);

  const { data: discounts } = reqForDiscounts;

  const ogUrl = `https://oramedcentr.com.ua/discount/${discountId}`;

  const meta = {
    ...defaultMetaProps,
    title: "ОРА - Знижки",
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl,
  };

  discounts?.sort((a, b) => (a._id.toString() === discountId ? -1 : 1));

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      meta,
      discounts: discounts ? JSON.parse(JSON.stringify(discounts)) : null,
    },
  };
};

export default Discount;
