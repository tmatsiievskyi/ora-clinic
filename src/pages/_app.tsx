import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/modules/Layout";
import { appWithTranslation } from "next-i18next";
import { Analytics } from "@vercel/analytics/react";
import { WithReactQueryProvider } from "@/global/utils";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WithReactQueryProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </WithReactQueryProvider>
  );
};

export default appWithTranslation(App);
