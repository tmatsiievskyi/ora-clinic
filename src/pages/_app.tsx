import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/modules/Layout";
import { appWithTranslation } from "next-i18next";
import { Analytics } from "@vercel/analytics/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
};

export default appWithTranslation(App);
