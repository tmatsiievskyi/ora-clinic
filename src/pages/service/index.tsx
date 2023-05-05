import { PageWrapper } from "@/components/PageWrapper";
import { getAllService } from "@/global/api/service-api";
import { IDiscountModel, IServiceModel } from "@/global/models/_interfaces";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface IServiceProps {
  services: IServiceModel[] | null;
}

const Service: NextPage<IServiceProps> = ({ services }) => {
  return (
    <PageWrapper>
      <p>Service</p>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<IServiceProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const reqForDiscounts = await getAllService();

  const { data: services } = reqForDiscounts;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      services: services ? JSON.parse(JSON.stringify(services)) : null,
    },
  };
};

export default Service;
