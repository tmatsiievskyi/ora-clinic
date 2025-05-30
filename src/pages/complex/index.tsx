import { PageWrapper } from "@/components/PageWrapper";
import { getAllComplexes, getComplexGroups } from "@/global/api/complex-api";
import { IComplexesProps } from "@/global/interfaces";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ComplexContainer } from "@/modules/Complex/containers";
import { defaultMetaProps } from "@/components/Meta/Meta";

const Complex: NextPage<IComplexesProps> = ({ groups, complexes }) => {
  return (
    <PageWrapper>
      <ComplexContainer groups={groups} complexes={complexes} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<IComplexesProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const reqForGroups = await getComplexGroups();
  const reqForAllComplexes = await getAllComplexes();
  const { data: groups } = reqForGroups;
  const { data: complexes } = reqForAllComplexes;

  console.log(groups);

  if (!groups || !complexes) {
    return {
      notFound: true,
    };
  }

  const ogUrl = "https://oramedcentr.com.ua/complex";

  const meta = {
    ...defaultMetaProps,
    title: 'МЦ "ОРА" - Комплексні обстеження',
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      meta,
      groups: groups ? JSON.parse(JSON.stringify(groups)) : null,
      complexes: complexes ? JSON.parse(JSON.stringify(complexes)) : null,
    },
  };
};

export default Complex;
