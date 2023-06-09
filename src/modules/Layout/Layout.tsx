import localFont from "next/font/local";
import { Header } from "../../components/Header";
import { Roboto, Oswald, Comfortaa } from "next/font/google";
import Meta, { MetaProps } from "@/components/Meta/Meta";

const helveticThin = localFont({
  src: "../../../public/fonts/HelveticaNeueCyr-Thin.ttf",
  variable: "--font-comfortaa",
});

const helveticLight = localFont({
  src: "../../../public/fonts/HelveticaNeueCyr-Light.ttf",
  variable: "--font-comfortaa",
});

const helveticRegular = localFont({
  src: "../../../public/fonts/HelveticaNeue.ttf",
  variable: "--font-helveticRegular",
});

const helveticBold = localFont({
  src: "../../../public/fonts/HelveticaNeueCyr-Bold.ttf",
  variable: "--font-helveticBold",
});

const oswald = Oswald({
  subsets: ["cyrillic"],
  variable: "--font-oswald",
});

const roboto = Roboto({
  subsets: ["cyrillic", "latin"],
  variable: "--font-roboto",
  weight: ["100", "700"],
});

const comfortaa = Comfortaa({
  subsets: ["cyrillic", "latin"],
  variable: "--font-comfortaa",
  weight: ["300"],
});

export const Layout = ({
  children,
  meta,
}: {
  children: JSX.Element;
  meta: MetaProps;
}) => {
  return (
    <>
      <Meta props={meta} />
      <div
        className={`bg-lightShade h-[100svh] overflow-hidden px-2 ${helveticThin.variable}
      ${helveticLight.variable}
     ${helveticRegular.variable}
     ${helveticBold.variable}
     ${oswald.variable} ${roboto.variable} ${comfortaa.variable}`}
      >
        <div className="h-[40px]">
          <Header />
        </div>
        <main
          className={`h-[calc(100svh-50px)] no-scrollbar overflow-y-scroll
        rounded-lg
        font-comfortaa
        `}
        >
          {children}
        </main>
        {/* <div className="h-[10px] md:h-[60px]">
        <div className="hidden md:block">
          <Footer />
        </div>
      </div> */}
      </div>
    </>
  );
};
