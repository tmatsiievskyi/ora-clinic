import { PageWrapper } from "@/components/PageWrapper";
import { getAllService } from "@/global/api/service-api";
import { IDiscountModel, IServiceModel } from "@/global/models/_interfaces";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface IEmployeeProps {}

const Employee: NextPage<IEmployeeProps> = ({}) => {
  return (
    <PageWrapper>
      <p>Employee</p>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<IEmployeeProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
    },
  };
};

export default Employee;
