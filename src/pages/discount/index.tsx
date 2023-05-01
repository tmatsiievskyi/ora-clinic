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

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      discounts: discounts ? JSON.parse(JSON.stringify(discounts)) : null,
    },
  };
};

export default Discount;
