import type {
  GetStaticProps,
  NextPage,
  GetStaticPropsContext,
  GetStaticPathsContext,
} from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { Title } from "@/UI/Title";
import { EmployeeItem } from "@/modules/Employee/containers";
import { useTranslation } from "next-i18next";
import {
  getEmployeeById,
  getEmployeeDepartments,
  getAllEmployees,
  getGroupedEmployee,
} from "@/global/api/employee-api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { EmployeeContainer } from "@/modules/Employee";
import { IEmployeeProps } from "@/global/interfaces";

const EmployeeById: NextPage<IEmployeeProps> = ({
  employee,
  groupedEmployees,
}) => {
  const { t } = useTranslation("common");
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

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      employee: employee ? JSON.parse(JSON.stringify(employee)) : null,
      groupedEmployees: groupedEmployees
        ? JSON.parse(JSON.stringify(groupedEmployees))
        : null,
    },
  };
};

export default EmployeeById;
