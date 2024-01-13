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
import { defaultMetaProps } from "@/components/Meta/Meta";
import {
  complexfamilyDoctorPriceRules,
  complexPriceRules,
} from "@/global/utils";

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

  const analysesPrice = complex.analyses.reduce((acc, cur) => {
    return acc + cur.price;
  }, 0);

  const analysesPriceFamDoc = complex.analyses.reduce((acc, cur) => {
    if (
      complexfamilyDoctorPriceRules.analysesToExclude.includes(
        cur._id.toHexString(),
      )
    ) {
      return acc;
    }
    return acc + cur.price;
  }, 0);

  // Examination
  const examinationPrice =
    complex.examination?.reduce((acc, cur) => {
      if (complexPriceRules.examToExclude.includes(cur._id.toHexString())) {
        return acc;
      }
      return acc + cur.price;
    }, 0) * 0.9;

  const examinationPriceFamDoc =
    complex.examination?.reduce((acc, cur) => {
      if (complexPriceRules.examToExclude.includes(cur._id.toHexString())) {
        return acc;
      }
      return acc + cur.price;
    }, 0) * 0.8;

  //Consult
  const consultPrice =
    complex.consultations?.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0) * 0.9;

  const consultPriceFamDoc =
    complex.consultations.reduce((acc, cur) => {
      if (
        complexfamilyDoctorPriceRules.consultationsToExclude.includes(
          cur._id.toHexString(),
        )
      ) {
        return acc;
      }
      return acc + cur.price;
    }, 0) * 0.8;

  const modifiedPrice = analysesPrice + examinationPrice + consultPrice;

  const modifiedFamDocPrice =
    analysesPriceFamDoc + examinationPriceFamDoc + consultPriceFamDoc;

  const updatedCompex = {
    ...JSON.parse(JSON.stringify(complex)),
    modifiedPrice,
    modifiedFamDocPrice,
  };

  const ogUrl = `https://oramedcentr.com.ua/complex/item/${complexId}`;

  const meta = {
    ...defaultMetaProps,
    title: `ОРА - Комплексні - ${
      complex.label.split(".")[1] || "Комплексні Обстеження"
    }`,
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "uk-UA", ["common"])),
      meta,
      complex: updatedCompex ? JSON.parse(JSON.stringify(updatedCompex)) : null,
    },
  };
};

export default ComplexItem;
