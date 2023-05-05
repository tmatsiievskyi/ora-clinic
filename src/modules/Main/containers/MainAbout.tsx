import { Title } from "@/UI/Title";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import docImage from "../../../../public/img/doc.jpg";
import { CompWithFramer } from "@/components/CompWithFramer";
import { Paragraph } from "@/UI/Paragraph";

export const MainAbout = () => {
  const { t } = useTranslation("common");

  return (
    <div className="min-h-full bg-light mt-2 p-2">
      <div className="grid gap-2 grid-cols-2">
        <div className=" col-span-1">
          <div>
            <Title>{t("common.why")}</Title>

            <Title>{t("common.title.start")}</Title>
            <span>
              <Title className="inline text-primary">{t("common.name")}</Title>
              <span className="font-helveticThin text-[24px] leading-[34px]  sm:text-[34px] sm:leading-[38px]">
                {""} ?
              </span>
            </span>
          </div>
          <div className="[&>p]:mb-4 mt-4">
            <Paragraph>{t("common.about.note1")}</Paragraph>
            <Paragraph>{t("common.about.note2")}</Paragraph>
            <Paragraph>{t("common.about.note3")}</Paragraph>
          </div>
        </div>
        <div className=" col-span-1">
          <CompWithFramer from="width" delay={1} duration={1}>
            <Image
              src={docImage}
              width={"1300"}
              height={"1300"}
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
      </div>
      <div></div>
    </div>
  );
};
