import { CustomDisclosure } from "../Disclosure";
import { ITableProps } from "./_interfaces";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { styles } from "@/styles/styles";

export const Table = ({ items, headerItems }: ITableProps) => {
  const { t } = useTranslation("common");
  return (
    <div className={`grid gap-0  grid-cols-4 w-full rounded-lg `}>
      <div
        className={`grid rounded-t-lg  text-slate-600 font-comfortaa text-xl col-span-4 gap-0 grid-cols-4 `}
      >
        {headerItems.map((item, index) => {
          return (
            <div
              key={item}
              className={`text-center  mb-1 ${
                index === headerItems.length - 1 ? "col-span-1" : "col-span-3"
              }`}
            >
              {t(`common.table.${item}`)}
            </div>
          );
        })}
      </div>
      <div className={`col-span-4`}>
        {items.map((item) => {
          return (
            <div key={item._id} className="mb-1 rounded-lg">
              <span></span>
              <CustomDisclosure
                buttonText={item._id}
                group="subService"
                items={item.data}
                defaultOpen={false}
                listClassNames="px-2"
                listItemClassNames={`grid gap-0 py-1 font-comfortaa border-b-[1px] border-lightShade px-2 grid-cols-4 [&>*:nth-child(1)]:col-span-3 [&>*:nth-child(2)]:col-span-1 [&>*:nth-child(2)]:text-right [&>*:nth-child(1)]:flex items-center`}
                buttonClassNames={`w-full rounded-xl text-slate-600 border-b-[1px] border-gray-200 rounded-none ${styles.gradientR}`}
                showPrice={true}
                buttonEl={
                  <span className="flex items-center justify-center w-full py-2">
                    <Image
                      src={`/img/svg/${item._id}.svg`}
                      width={30}
                      height={30}
                      alt="icon"
                      className={`mr-1`}
                    />

                    <span className="text-xl">
                      {item.localizedName}
                      {/* {t(`services.title.${item._id}`)} */}
                    </span>
                  </span>
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
