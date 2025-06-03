import { Title } from "@/UI/Title";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import docImage from "../../../../public/img/doc.jpg";
import amritaImage from "../../../../public/img/partners/amrita.png";
import caliImage from "../../../../public/img/partners/cali.png";
import csdImage from "../../../../public/img/partners/csd.png";

import { CompWithFramer } from "@/components/CompWithFramer";
import { Paragraph } from "@/UI/Paragraph";
import { BadgeCheck } from "@/UI/BadgeCheck";
import { ImageCarousel } from "@/components/ImageCarousel";

export const MainAbout = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex-col  mt-2 rounded-lg">
      <div className="bg-light grid gap-2 grid-cols-2 p-2 rounded-lg">
        <div className="h-full col-span-2 md:col-span-1">
          <CompWithFramer
            className="h-full"
            from="width"
            delay={1}
            duration={1}
          >
            <Image
              src={docImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "70% 50%",
                borderRadius: "9px",
              }}
              alt="ora image"
            />
          </CompWithFramer>
        </div>
        <div className=" col-span-2 md:col-span-1">
          <div>
            <Title>{t("common.why")}</Title>

            <Title>{t("common.title.start")}</Title>
            <span>
              <Title className="inline text-primary">{t("common.name")}</Title>
              <span className="font-comfortaa text-[24px] leading-[34px]  sm:text-[34px] sm:leading-[38px]">
                {""} ?
              </span>
            </span>
          </div>
          <div className="[&>p]:mb-4 mt-4">
            <Paragraph>
              <>
                <BadgeCheck className="inline text-primary" />{" "}
                {t("common.about.note1")}
              </>
            </Paragraph>

            <Paragraph>
              <>
                <BadgeCheck className="inline text-primary" />{" "}
                {t("common.about.note2")}
              </>
            </Paragraph>
            <Paragraph>
              <>
                <BadgeCheck className="inline text-primary" />{" "}
                {t("common.about.note3")}
              </>
            </Paragraph>
          </div>
        </div>
      </div>
      <div className="bg-light flex-1 mt-2 rounded-lg p-2">
        <Title>{t("common.ourPratners")}</Title>
        <div className="flex h-full items-center justify-around pb-2">
          <ImageCarousel />
          {/* <CompWithFramer from="opacity" delay={0.3} duration={1}>
            <Image
              src={amritaImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "70% 50%",
                borderRadius: "9px",
              }}
              alt="ora image"
            />
          </CompWithFramer>
          <CompWithFramer from="opacity" delay={0.8} duration={1}>
            <Image
              src={caliImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "70% 50%",
                borderRadius: "9px",
              }}
              alt="ora image"
            />
          </CompWithFramer>
          <CompWithFramer from="opacity" delay={1.2} duration={1}>
            <Image
              src={csdImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "70% 50%",
                borderRadius: "9px",
              }}
              alt="ora image"
            />
          </CompWithFramer> */}
        </div>
      </div>
    </div>
  );
};
