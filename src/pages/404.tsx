import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PageWrapper } from "@/components/PageWrapper";

const Error = () => {
  return (
    <PageWrapper>
      <p>404</p>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
    },
  };
};

export default Error;
