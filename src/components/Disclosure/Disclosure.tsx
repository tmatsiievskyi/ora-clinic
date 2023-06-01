import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import {
  motion as m,
  AnimatePresence,
  useAnimationControls,
  Variants,
} from "framer-motion";
import { IDisclosureProps } from "./_interfaces";

export const CustomDisclosure: FC<IDisclosureProps> = ({
  buttonText,
  items,
  group,
  defaultOpen,
  buttonClassNames,
  listClassNames,
  showPrice,
  buttonEl,
  listItemClassNames,
  showAdditionalText,
  additionalText,
}) => {
  const { t } = useTranslation();
  const controls = useAnimationControls();

  const animVariants: { [keys: string]: Variants } = {
    right: {
      hidden: { opacity: 0, x: -20 },
    },
  };

  return (
    <div className="w-full rounded-lg">
      <div className="w-full max-w rounded-lg bg-light p-0">
        <Disclosure defaultOpen={defaultOpen}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`flex w-full justify-between items-center rounded-lg ${buttonClassNames}`}
              >
                {buttonEl ? buttonEl : t(`${buttonText}`)}
                {open ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 12H6"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                )}
              </Disclosure.Button>
              <AnimatePresence initial={true} mode="wait">
                {open && (
                  <Disclosure.Panel
                    as={m.div}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    static
                    className={`${listClassNames} overflow-hidden`}
                  >
                    {items.map((item, index) => {
                      const { _id, label, price } = item;
                      return (
                        <m.li key={_id} className={`${listItemClassNames}`}>
                          <m.span
                            key={_id + label}
                            initial={{ opacity: 0, x: "-100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "-100%" }}
                            transition={{
                              duration: 0.11 * index,
                              ease: "easeInOut",
                            }}
                            className="font-comfortaa break-words"
                          >
                            {t(`${label}`)}
                          </m.span>
                          {showPrice && (
                            <m.span
                              key={_id + price}
                              initial={{ opacity: 0, x: "100%" }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: "100%" }}
                              transition={{
                                duration: 0.1 * index,
                              }}
                            >
                              <span className="text-primary font-oswald text-xl">
                                {price}
                              </span>{" "}
                              <span>{t("common.currency.grn")}</span>
                            </m.span>
                          )}
                        </m.li>
                      );
                    })}
                    {showAdditionalText && (
                      <p className=" text-xs font-comfortaa mt-2">
                        *{t(`${additionalText}`)}
                      </p>
                    )}
                  </Disclosure.Panel>
                )}
              </AnimatePresence>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
