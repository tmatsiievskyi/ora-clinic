import { FC } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
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
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
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
              <Disclosure.Panel className={`${listClassNames}`}>
                {items.map((item) => {
                  const { _id, label, price } = item;
                  return (
                    <li key={_id} className={listItemClassNames}>
                      <span>{t(`${label}`)}</span>
                      {showPrice && (
                        <span>
                          <span className="text-primary font-oswald text-xl">
                            {price}
                          </span>{" "}
                          <span>{t("common.currency.grn")}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
