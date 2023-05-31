import { defaultMetaProps } from "@/components/Meta/Meta";
import { PageWrapper } from "@/components/PageWrapper";
import { getAllService, getServiceById } from "@/global/api/service-api";
import { IServiceProps } from "@/global/interfaces";
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

  const ogUrl = `https://oramedcentr.com.ua/service/${serviceId}`;

  const meta = {
    ...defaultMetaProps,
    title: `ОРА - Послуги - ${service.label.split(".")[2] || "Послуги"}`,
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      meta,
      services: services ? JSON.parse(JSON.stringify(services)) : null,
      service: service ? JSON.parse(JSON.stringify(service)) : null,
    },
  };
};

export default ServiceItem;
