import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { MainInit, MainItems } from "@/modules/Main/containers";
import { getAllEmployees } from "@/global/api/employee-api";
import { getAllDiscounts } from "@/global/api/discount-api";
import { IDiscountModel, IEmployeeModel } from "@/global/models/_interfaces";

interface IMainProps {
  employees: IEmployeeModel[] | null;
  discounts: IDiscountModel[] | null;
}

const Home: NextPage<IMainProps> = (props) => {
  const { employees, discounts } = props;

  console.log(discounts);

  return (
    <div className="h-full">
      <MainInit discounts={discounts} />
      <MainItems />
    </div>
  );
};

export const getStaticProps: GetStaticProps<IMainProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const reqForEmployees = await getAllEmployees();
  const reqForDiscounts = await getAllDiscounts();

  const { data: employees } = reqForEmployees;
  const { data: discounts } = reqForDiscounts;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      employees: employees ? JSON.parse(JSON.stringify(employees)) : null,
      discounts: discounts ? JSON.parse(JSON.stringify(discounts)) : null,
    },
  };
};

export default Home;
