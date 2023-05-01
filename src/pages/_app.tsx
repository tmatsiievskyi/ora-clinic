import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/modules/Layout";
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(App);
