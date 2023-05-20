import { useEffect } from "react";
import Image from "next/image";
import mainInit from "../../../../public/img/main/init.jpg";
import { useTranslation } from "next-i18next";
import { styles } from "@/styles/styles";
import { useAnimationControls, motion as m, Variants } from "framer-motion";
import { Slider, SliderItem } from "@/components/Slider";
import { Button } from "@/UI/Button";
import { IDiscountModel } from "@/global/models/_interfaces";
import Link from "next/link";

export const MainInit = ({
  discounts,
}: {
  discounts: IDiscountModel[] | null;
}) => {
  const { t } = useTranslation("common");
  const controls = useAnimationControls();

  const animVar: Variants = {
    hidden: {
      opacity: 0,
    },
  };

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: { delay: i * 0.3, duration: 0.7, ease: "easeInOut" },
    }));
  }, []);

  return (
    <div
      className={`relative flex flex-col justify-between
    px-2 py-2  min-h-full rounded-lg 
    before:content-[''] before:absolute before:w-full before:h-full before:bg-semiDarkTr before:right-0 before:top-0 before:z-10 before:rounded-lg`}
    >
      <div className="relative z-10 font-helveticThin  text-3xl md:text-4xl text-light overflow-hidden">
        <m.p variants={animVar} initial="hidden" custom={1} animate={controls}>
          {t("common.title.start")}{" "}
          <span className="font-helveticThin text-primary font-thin">
            {t("common.name")}
          </span>
        </m.p>{" "}
        <m.p variants={animVar} initial="hidden" custom={2} animate={controls}>
          {t("common.title.middle")}
        </m.p>
        <m.p variants={animVar} initial="hidden" custom={3} animate={controls}>
          {t("common.title.end")}
        </m.p>
        <m.p variants={animVar} initial="hidden" custom={4} animate={controls}>
          {t("common.title.finish")}
        </m.p>
      </div>

      <div className="relative z-20 mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-end">
        <m.div
          variants={animVar}
          initial="hidden"
          custom={5}
          animate={controls}
          className={`w-full flex-col sm:mr-4 justify-between text-light  sm:max-w-[350px] ${styles.heading4}`}
        >
          <p className="text-primary text-3xl">{t("common.about")}:</p>
          <p className={`${styles.paragraph}`}>{t("common.about.shortDesc")}</p>
          <hr className="my-1 sm:my-3" />
          <p className={`${styles.paragraph}`}>{t("common.about.shortDesc")}</p>
        </m.div>

        {discounts && (
          <m.div
            variants={animVar}
            initial="hidden"
            custom={6}
            animate={controls}
            className="mt-2 max-h-[180px] min-w-full sm:min-w-[350px] border-primary bg-primary/70 border text-light font-helveticThin text-2xl rounded-lg"
          >
            <Slider>
              {discounts.map((item) => {
                return (
                  <SliderItem key={item._id.toString()}>
                    <div className="py-2 [&>p]:mb-8 overflow-y-hidden">
                      <p>{item.title}</p>
                      <p className="text-base">{item.description}</p>
                      <div className="flex justify-between items-end">
                        <span
                          className={`${styles.numberText}} text-3xl leading-7`}
                        >
                          {item.discountAmount}%
                        </span>
                        <Button type="light">
                          <Link href={`/discount/${item._id}`}>
                            <span>{t("common.moreDetails")}</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </SliderItem>
                );
              })}
            </Slider>
          </m.div>
        )}
      </div>

      <Image
        src={mainInit}
        alt="Doctors"
        priority
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          objectPosition: "center top",
          top: "0",
          left: "0",
          borderRadius: "9px",
        }}
      />
    </div>
  );
};
