import type {
  GetStaticProps,
  NextPage,
  GetStaticPropsContext,
  GetStaticPathsContext,
} from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IComplexProps } from "@/global/interfaces";
import { getAllComplexes, getComplexById } from "@/global/api/complex-api";
import { ComplexItemContainer } from "@/modules/Complex/containers";

const ComplexItem: NextPage<IComplexProps> = ({ complex }) => {
  return (
    <PageWrapper>
      <ComplexItemContainer complex={complex} />
    </PageWrapper>
  );
};

export const getStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  const reqForComlexes = await getAllComplexes();
  const { data: complexes } = reqForComlexes;
  const paths = locales
    ? locales.reduce<string[]>((acc, cur) => {
        complexes &&
          complexes.forEach((item) => {
            acc.push(`/${cur}/complex/item/${item._id}`);
          });
        return acc;
      }, [])
    : complexes &&
      complexes.map((item) => ({
        params: { complexId: item._id },
      }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IComplexProps> = async (
  context: GetStaticPropsContext,
) => {
  const { locale, params } = context;
  const { complexId } = params || {};

  if (!complexId) {
    return {
      notFound: true,
    };
  }

  const reqForComplex = await getComplexById(complexId);
  const { data: complex } = reqForComplex;

  if (!complex) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      complex: complex ? JSON.parse(JSON.stringify(complex)) : null,
    },
  };
};

export default ComplexItem;
