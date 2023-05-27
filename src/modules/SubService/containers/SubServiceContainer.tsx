import { ISubServiceContainerProps } from "./_interfaces";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import useSWR from "swr";
import { useDebounce } from "@/global/hooks";
import fetcher from "@/global/utils/fetcher";
import { SearchIcon } from "@/components/Icons/Search";
import { PageTitle } from "@/components/PageTitle";
import { motion as m } from "framer-motion";
import { Table } from "@/components/Table";
import { IGroupedSubService } from "@/global/api/_interfaces";
import { tabs } from "../data";
import { styles } from "@/styles/styles";

export const SubServiceContainer = ({
  subService,
  groupedSubServices,
}: ISubServiceContainerProps) => {
  const { t } = useTranslation("common");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { data: searchedSubSer } = useSWR<IGroupedSubService[] | null>(
    debouncedQuery.length > 0 && `api/sub-service?query=${debouncedQuery}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  console.log(searchedSubSer, groupedSubServices);

  const handleSideBarOpen = () => {
    setIsSideBarOpen((prev) => !prev);
  };
  return (
    <div className="h-full overflow-scroll no-scrollbar">
      <div className="pt-2 px-2">
        <PageTitle title="common.service" className="w-[280px] md:w-[340px] " />
      </div>
      <m.div
        initial={{ x: "100%", opacity: "0" }}
        whileInView={{ x: "0%", opacity: "1" }}
        viewport={{ once: true }}
        transition={{ duration: "0.75", ease: "easeOut" }}
        className={`flex justify-center flex-col ${styles.container} px-2 w-full ml-auto mr-auto`}
      >
        <form className="py-8 flex space-x-4" action="#">
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative shadow-sm border-0 border-b-dark-accent-2 rounded-none border-b-[1px] ">
              <div className="absolute bg-light inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-dark-accent-3" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="text-dark placeholder:text-dark-accent-3 focus:ring-transparent border-none bg-light focus:border-transparent block w-full pl-10 sm:text-sm rounded-md"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </form>
        {/* <Table /> */}
        {query && searchedSubSer && searchedSubSer.length > 0 ? (
          <Table items={searchedSubSer} headerItems={tabs} />
        ) : (
          groupedSubServices && (
            <Table items={groupedSubServices} headerItems={tabs} />
          )
        )}
      </m.div>
    </div>
  );
};

{
  /* <div className="h-full flex relative rounded-lg">
<Sidebar
  title="common.price"
  isOpen={isSideBarOpen}
  handleOpen={handleSideBarOpen}
>
  <>
    <form className="py-8 flex space-x-4" action="#">
      <div className="flex-1 min-w-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative shadow-sm border-0 border-b-dark-accent-2 rounded-none border-b-[1px] ">
          <div className="absolute bg-light inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-dark-accent-3" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="text-dark placeholder:text-dark-accent-3 focus:ring-transparent border-none bg-light focus:border-transparent block w-full pl-10 sm:text-sm rounded-md"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </form>
    {groupedSubServices &&
      groupedSubServices.map((item) => {
        return (
          <div key={item._id}>
            <h4
              className={`${
                isSideBarOpen ? "justify-start" : "justify-center"
              } bg-lightShade sm:pl-2 flex items-center py-1 font-helveticLight text-base`}
            >
              <Image
                src={`/img/svg/${item._id}.svg`}
                width={30}
                height={30}
                alt="icon"
                className={`mr-1`}
              />
              {isSideBarOpen && (
                <span>{t(`services.title.${item._id}`)}</span>
              )}
            </h4>
            <ul className="font-helveticThin">
              {item.data.map((subService, index) => {
                const { _id, label, price } = subService;
                return (
                  <li key={_id.toString()} className="w-full ">
                    <span
                      className={`flex w-full items-center px-1 ${
                        index < item.data.length - 1 ? "border-b" : null
                      } border-lightShade py-2`}
                    >
                      <Link
                        href={`/employee/${_id}`}
                        className="flex items-center min-w-full justify-between"
                      >
                        <span className="font-helveticLight">
                          {label}
                        </span>
                        <span className=" font-oswald text-primary">
                          {price}
                          <span className="font-helveticLight text-sm text-dark ml-1">
                            {t("common.currency.grn")}
                          </span>
                        </span>
                      </Link>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
  </>
</Sidebar>
</div> */
}
