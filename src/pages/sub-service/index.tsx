import { PageWrapper } from "@/components/PageWrapper";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ISubServiceProps } from "@/global/interfaces";
import {
  getFirstSubService,
  getGroupedSubService,
} from "@/global/api/subservice-api";
import { SubServiceContainer } from "@/modules/SubService/containers/SubServiceContainer";

const SubService: NextPage<ISubServiceProps> = ({
  subService,
  groupedSubServices,
}) => {
  return (
    <PageWrapper>
      <>
        <SubServiceContainer
          subService={subService}
          groupedSubServices={groupedSubServices}
        />
      </>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<ISubServiceProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const reqForSubService = await getFirstSubService();
  const reqForGroupedSubServices = await getGroupedSubService();
  const { data: subService } = reqForSubService;
  const { data: groupedSubServices } = reqForGroupedSubServices;

  if (!subService || !groupedSubServices) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      subService: subService ? JSON.parse(JSON.stringify(subService)) : null,
      groupedSubServices: groupedSubServices
        ? JSON.parse(JSON.stringify(groupedSubServices))
        : null,
    },
  };
};

export default SubService;
