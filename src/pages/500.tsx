import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { defaultMetaProps } from "@/components/Meta/Meta";

const Error = () => {
  return (
    <PageWrapper>
      <p>500</p>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const ogUrl = "https://oramedcentr.com.ua/500";

  const meta = {
    ...defaultMetaProps,
    title: "ОРА - Медичний центр",
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      meta,
    },
  };
};

export default Error;
