import { CustomDisclosure } from "../Disclosure";
import { ITableProps } from "./_interfaces";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export const Table = ({ items, headerItems }: ITableProps) => {
  const { t } = useTranslation("common");
  return (
    <div
      className={`grid gap-0  grid-cols-${headerItems.length} w-full rounded-lg `}
    >
      <div
        className={`grid rounded-t-lg  bg-gray-100  text-dark font-helveticThin text-2xl col-span-${headerItems.length} gap-0 grid-cols-${headerItems.length} `}
      >
        {headerItems.map((item, index) => {
          return (
            <div
              key={item}
              className={`text-center ${
                index + 1 < headerItems.length
                  ? "border-r-[1px] border-grey-200"
                  : ""
              } `}
            >
              {t(`common.table.${item}`)}
            </div>
          );
        })}
      </div>
      <div className={`col-span-${headerItems.length}`}>
        {items.map((item) => {
          return (
            <div key={item._id}>
              <CustomDisclosure
                buttonText={item._id}
                group="subService"
                items={item.data}
                defaultOpen={true}
                listClassNames="border-b-1 border-primary px-2 [&>*:nth-child(odd)]:bg-gray-50"
                listItemClassNames={`grid gap-0 px-2 grid-cols-${headerItems.length} [&>*:nth-child(2)]:text-center [&>*:nth-child(1)]:flex items-center`}
                buttonClassNames="w-full border-[1px] border-gray-200"
                showPrice={true}
                buttonEl={
                  <span className="flex items-center justify-center w-full ">
                    <Image
                      src={`/img/svg/${item._id}.svg`}
                      width={40}
                      height={40}
                      alt="icon"
                      className={`mr-1`}
                    />

                    <span className="text-xl font-helveticThin">
                      {t(`services.title.${item._id}`)}
                    </span>
                  </span>
                }
              />
            </div>
          );
        })}
        {/* <Disclosure /> */}
      </div>
    </div>
  );
};
