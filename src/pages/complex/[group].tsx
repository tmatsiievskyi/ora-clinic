import { PageWrapper } from "@/components/PageWrapper";
import { getComplexByGroup, getComplexGroups } from "@/global/api/complex-api";
import { IComplexesProps } from "@/global/interfaces";
import {
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
  GetStaticPathsContext,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ComplexContainer } from "@/modules/Complex/containers";

const Complex: NextPage<IComplexesProps> = ({ groups, complexes }) => {
  return (
    <PageWrapper>
      <ComplexContainer groups={groups} complexes={complexes} />
    </PageWrapper>
  );
};

export const getStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  const resp = await getComplexGroups();
  const groups = resp.data;
  const paths = locales
    ? locales.reduce<string[]>((acc, cur) => {
        groups &&
          groups.forEach((item) => {
            acc.push(`/${cur}/complex/${item}`);
          });
        return acc;
      }, [])
    : groups &&
      groups.map((item) => ({
        params: { category: item.toString() },
      }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IComplexesProps> = async (
  context: GetStaticPropsContext,
) => {
  const { locale, params } = context;
  const { group } = params || {};

  if (!group) {
    return {
      notFound: true,
    };
  }
  const reqForGroups = await getComplexGroups();
  const reqForComplexByGroup = await getComplexByGroup(group);
  const { data: groups } = reqForGroups;
  const { data: complexes } = reqForComplexByGroup;

  if (!groups || !complexes) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      groups: groups ? JSON.parse(JSON.stringify(groups)) : null,
      complexes: complexes ? JSON.parse(JSON.stringify(complexes)) : null,
    },
  };
};

export default Complex;
