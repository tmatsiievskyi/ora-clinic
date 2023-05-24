import { PageWrapper } from "@/components/PageWrapper";
import {
  getAllService,
  getFirstService,
  getServiceById,
} from "@/global/api/service-api";
import { IServiceProps } from "@/global/interfaces";
import { IDiscountModel, IServiceModel } from "@/global/models/_interfaces";
import { ServiceContainer } from "@/modules/Service/containers";
import type {
  GetStaticProps,
  NextPage,
  GetStaticPropsContext,
  GetStaticPathsContext,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ServiceItem: NextPage<IServiceProps> = ({ services, service }) => {
  return (
    <PageWrapper>
      <ServiceContainer services={services} service={service} />
    </PageWrapper>
  );
};

export const getStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  const reqForServices = await getAllService();
  const { data: services } = reqForServices;
  const paths = locales
    ? locales.reduce<string[]>((acc, cur) => {
        services &&
          services.forEach((item) => {
            acc.push(`/${cur}/service/${item._id}`);
          });
        return acc;
      }, [])
    : services &&
      services.map((item) => ({
        params: { serviceId: item._id },
      }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IServiceProps> = async (
  context: GetStaticPropsContext,
) => {
  const { locale, params } = context;
  const { serviceId } = params || {};

  if (!serviceId) {
    return {
      notFound: true,
    };
  }

  const reqForDiscounts = await getAllService();
  const reqForService = await getServiceById(serviceId);
  const { data: services } = reqForDiscounts;
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

export default ServiceItem;
