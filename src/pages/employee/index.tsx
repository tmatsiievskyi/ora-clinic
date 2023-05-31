import { PageWrapper } from "@/components/PageWrapper";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  getFirstEmployee,
  getGroupedEmployee,
} from "@/global/api/employee-api";
import { EmployeeContainer } from "@/modules/Employee";
import { IEmployeesProps } from "@/global/interfaces";
import { defaultMetaProps } from "@/components/Meta/Meta";

const Employee: NextPage<IEmployeesProps> = ({
  employee,
  groupedEmployees,
}) => {
  return (
    <PageWrapper>
      <>
        <EmployeeContainer
          groupedEmployees={groupedEmployees}
          employee={employee}
        />
      </>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<IEmployeesProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const reqForEmployee = await getFirstEmployee();
  const reqForGroupedEmployees = await getGroupedEmployee();
  const { data: employee } = reqForEmployee;
  const { data: groupedEmployees } = reqForGroupedEmployees;

  if (!groupedEmployees) {
    return {
      notFound: true,
    };
  }

  const ogUrl = "https://oramedcentr.com.ua/employee";

  const meta = {
    ...defaultMetaProps,
    title: "ОРА - Лікарі",
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      meta,
      employee: employee ? JSON.parse(JSON.stringify(employee)) : null,
      groupedEmployees: groupedEmployees
        ? JSON.parse(JSON.stringify(groupedEmployees))
        : null,
    },
  };
};

export default Employee;
