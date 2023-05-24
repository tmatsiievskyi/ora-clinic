import { PageWrapper } from "@/components/PageWrapper";
import { getAllService, getFirstService } from "@/global/api/service-api";
import { IServiceProps } from "@/global/interfaces";
import { IDiscountModel, IServiceModel } from "@/global/models/_interfaces";
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

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      services: services ? JSON.parse(JSON.stringify(services)) : null,
      service: service ? JSON.parse(JSON.stringify(service)) : null,
    },
  };
};

export default Service;
