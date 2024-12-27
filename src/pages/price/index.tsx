import { PageWrapper } from "@/components/PageWrapper";
import type { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { findAllWithOptions } from "@/global/api/subservice-api";
import { SubServiceContainer } from "@/modules/SubService/containers/SubServiceContainer";
import { defaultMetaProps } from "@/components/Meta/Meta";
import { IFindAllSubservicesApiResp } from "@/global/api/_interfaces";

const SubService: NextPage = () => {
  return (
    <PageWrapper>
      <SubServiceContainer />
    </PageWrapper>
  );
};

// export const getStaticProps: GetStaticProps<ISubServiceProps> = async ({
//   locale,
// }: GetStaticPropsContext) => {
//   const reqForSubService = await getFirstSubService();
//   const reqForGroupedSubServices = await getGroupedSubService();
//   const { data: subService } = reqForSubService;
//   const { data: groupedSubServices } = reqForGroupedSubServices;

//   if (!subService || !groupedSubServices) {
//     return {
//       notFound: true,
//     };
//   }

//   const ogUrl = "https://oramedcentr.com.ua/price";

//   const meta = {
//     ...defaultMetaProps,
//     title: "ОРА - Ціни",
//     ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
//     ogUrl,
//   };

//   return {
//     props: {
//       ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
//       meta,
//       subService: subService ? JSON.parse(JSON.stringify(subService)) : null,
//       groupedSubServices: groupedSubServices
//         ? JSON.parse(JSON.stringify(groupedSubServices))
//         : null,
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  const initialLimit = 25;
  // const subservicesData = await findAllWithOptions({
  //   search: undefined,
  //   limit: String(initialLimit),
  // });

  // if (!subservicesData) {
  //   return {
  //     notFound: true,
  //   };
  // }

  const ogUrl = "https://oramedcentr.com.ua/price";

  const meta = {
    ...defaultMetaProps,
    title: 'МЦ "ОРА" - Ціни',
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      meta,
      // initialData: {
      //   ...subservicesData,
      //   data: JSON.parse(JSON.stringify(subservicesData.data)),
      // },
      // initialLimit,
    },
  };
};

export default SubService;
