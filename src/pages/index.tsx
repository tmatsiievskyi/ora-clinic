import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import {
  MainAbout,
  MainInit,
  MainItems,
  MainContacts,
} from "@/modules/Main/containers";
import { getAllEmployees } from "@/global/api/employee-api";
import { getAllDiscounts } from "@/global/api/discount-api";
import {
  IDiscountModel,
  IEmployeeModel,
  IServiceModel,
} from "@/global/models/_interfaces";
import { getAllService } from "@/global/api/service-api";

interface IMainProps {
  employees: IEmployeeModel[] | null;
  discounts: IDiscountModel[] | null;
  services: IServiceModel[] | null;
}

const Home: NextPage<IMainProps> = (props) => {
  const { employees, discounts, services } = props;

  return (
    <div className="h-full">
      <MainInit discounts={discounts} />
      <MainItems employees={employees} services={services} />
      <MainAbout />
      <MainContacts />
    </div>
  );
};

export const getStaticProps: GetStaticProps<IMainProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const reqForEmployees = await getAllEmployees();
  const reqForDiscounts = await getAllDiscounts();
  const reqForServices = await getAllService();

  const { data: employees } = reqForEmployees;
  const { data: discounts } = reqForDiscounts;
  const { data: services } = reqForServices;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      employees: employees ? JSON.parse(JSON.stringify(employees)) : null,
      discounts: discounts ? JSON.parse(JSON.stringify(discounts)) : null,
      services: services ? JSON.parse(JSON.stringify(services)) : null,
    },
  };
};

export default Home;
