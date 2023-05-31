import { PageWrapper } from "@/components/PageWrapper";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ISubServiceProps } from "@/global/interfaces";
import {
  getFirstSubService,
  getGroupedSubService,
} from "@/global/api/subservice-api";
import { SubServiceContainer } from "@/modules/SubService/containers/SubServiceContainer";
import { defaultMetaProps } from "@/components/Meta/Meta";

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

  const ogUrl = "https://oramedcentr.com.ua/price";

  const meta = {
    ...defaultMetaProps,
    title: "ОРА - Ціни",
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      meta,
      subService: subService ? JSON.parse(JSON.stringify(subService)) : null,
      groupedSubServices: groupedSubServices
        ? JSON.parse(JSON.stringify(groupedSubServices))
        : null,
    },
  };
};

export default SubService;
