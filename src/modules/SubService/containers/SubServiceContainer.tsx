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
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { data: searchedSubSer } = useSWR<IGroupedSubService[] | null>(
    debouncedQuery.length > 0 && `api/sub-service?query=${debouncedQuery}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

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
        <form
          className="py-6 flex space-x-4 "
          action="#"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-lg  ">
              <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                <SearchIcon className="h-8 w-8 text-slate-300" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="text-dark border-slate-200 border-[2px] focus-visible:border-primary focus-visible:outline-none text-lg placeholder:text-dark-accent-3 bg-light  block w-full pl-10 pr-1 py-1 rounded-lg"
                placeholder={t("common.search") || "Search"}
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
