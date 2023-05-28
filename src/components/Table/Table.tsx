import { CustomDisclosure } from "../Disclosure";
import { ITableProps } from "./_interfaces";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export const Table = ({ items, headerItems }: ITableProps) => {
  // console.log(items);
  // const cat = JSON.stringify(
  //   items
  //     .filter((item) => item._id === "vertebrologist")[0]
  //     .data.map((item) => item.label)
  //     .reduce((o, key) => Object.assign(o, { [key]: "" }), {}),
  // );

  // console.log(cat);

  const { t } = useTranslation("common");
  return (
    <div
      className={`grid gap-0  grid-cols-${headerItems.length} w-full rounded-lg `}
    >
      <div
        className={`grid rounded-t-lg  text-slate-600 font-comfortaa text-xl col-span-${headerItems.length} gap-0 grid-cols-${headerItems.length} `}
      >
        {headerItems.map((item, index) => {
          return (
            <div key={item} className={`text-center  mb-1`}>
              {t(`common.table.${item}`)}
            </div>
          );
        })}
      </div>
      <div className={`col-span-${headerItems.length}`}>
        {items.map((item) => {
          return (
            <div key={item._id} className="mb-1 rounded-lg">
              <CustomDisclosure
                buttonText={item._id}
                group="subService"
                items={item.data}
                defaultOpen={false}
                listClassNames="px-2"
                listItemClassNames={`grid gap-0 py-1 font-comfortaa border-b-[1px] border-lightShade px-2 grid-cols-${headerItems.length} [&>*:nth-child(2)]:text-center [&>*:nth-child(1)]:flex items-center`}
                buttonClassNames="w-full rounded-xl text-slate-600 border-b-[1px] border-gray-200 rounded-none bg-gradient-to-r from-purple-300 to-lightShade "
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
