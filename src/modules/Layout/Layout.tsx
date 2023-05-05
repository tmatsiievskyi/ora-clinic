import localFont from "next/font/local";
import { Header } from "../../components/Header";
import { Footer } from "@/components/Footer";
import { Roboto, Oswald } from "next/font/google";

const helveticThin = localFont({
  src: "../../../public/fonts/HelveticaNeueCyr-Thin.ttf",
  variable: "--font-helveticThin",
});

const helveticLight = localFont({
  src: "../../../public/fonts/HelveticaNeueCyr-Light.ttf",
  variable: "--font-helveticLight",
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

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div
      className={`bg-lightShade h-full px-2 ${helveticThin.variable}
      ${helveticLight.variable}
     ${helveticRegular.variable}
     ${helveticBold.variable}
     ${oswald.variable}`}
    >
      <div className="h-[30px]">
        <Header />
      </div>
      <main
        className={`h-[calc(100%-90px)] overflow-y-scroll
        rounded-lg
        font-helveticLight
        `}
      >
        {children}
      </main>
      <div className="h-[60px]">
        <Footer />
      </div>
    </div>
  );
};
