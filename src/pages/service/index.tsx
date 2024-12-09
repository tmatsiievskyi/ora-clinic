import { defaultMetaProps } from "@/components/Meta/Meta";
import { PageWrapper } from "@/components/PageWrapper";
import { getAllService, getFirstService } from "@/global/api/service-api";
import { IServiceProps } from "@/global/interfaces";
import { ServiceContainer } from "@/modules/Service/containers";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Service: NextPage<IServiceProps> = ({ services, service }) => {
  return (
    <PageWrapper>
      <ServiceContainer services={services} service={service} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<IServiceProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const reqForServices = await getAllService();
  const reqForService = await getFirstService();
  const { data: services } = reqForServices;
  const { data: service } = reqForService;

  if (!service || !services) {
    return {
      notFound: true,
    };
  }

  // const ogUrl = "https://oramedcentr.com.ua/service";

  // const meta = {
  //   ...defaultMetaProps,
  //   title: "ОРА - Послуги",
  //   ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
  //   ogUrl,
  // };

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      // meta,
      services: services ? JSON.parse(JSON.stringify(services)) : null,
      service: service ? JSON.parse(JSON.stringify(service)) : null,
    },
  };
};

export default Service;
