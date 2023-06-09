import type {
  GetStaticProps,
  NextPage,
  GetStaticPropsContext,
  GetStaticPathsContext,
} from "next";
import { PageWrapper } from "@/components/PageWrapper";
import {
  getEmployeeById,
  getAllEmployees,
  getGroupedEmployee,
} from "@/global/api/employee-api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { EmployeeContainer } from "@/modules/Employee";
import { IEmployeeProps } from "@/global/interfaces";
import { defaultMetaProps } from "@/components/Meta/Meta";

const EmployeeById: NextPage<IEmployeeProps> = ({
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

export const getStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  const reqForEmployees = await getAllEmployees();
  const { data: employees } = reqForEmployees;
  const paths = locales
    ? locales.reduce<string[]>((acc, cur) => {
        employees &&
          employees.forEach((item) => {
            acc.push(`/${cur}/employee/${item._id}`);
          });
        return acc;
      }, [])
    : employees &&
      employees.map((item) => ({
        params: { employeeId: item._id },
      }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IEmployeeProps> = async (
  context: GetStaticPropsContext,
) => {
  const { locale, params } = context;
  const { employeeId } = params || {};

  if (!employeeId) {
    return {
      notFound: true,
    };
  }

  const reqForEmployee = await getEmployeeById(employeeId);
  const reqForGroupedEmployees = await getGroupedEmployee();
  const { data: employee } = reqForEmployee;
  const { data: groupedEmployees } = reqForGroupedEmployees;

  if (!employee || !groupedEmployees) {
    return {
      notFound: true,
    };
  }

  const ogUrl = `https://oramedcentr.com.ua/employee/${employeeId}`;

  const meta = {
    ...defaultMetaProps,
    title: `ОРА - ${employee.lastName} ${employee.firstName} ${employee.surname}`,
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

export default EmployeeById;
