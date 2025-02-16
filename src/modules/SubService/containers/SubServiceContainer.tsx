import { Fragment, ReactNode, useCallback, useState } from "react";
import { useTranslation } from "next-i18next";
import { PageTitle } from "@/components/PageTitle";
import { TTableColumn } from "@/components/Table/_types";
import { ISubServiceModel } from "@/global/models/_interfaces";
import { TableCell, TableRow } from "@/components/Table/Table.component";
import { cnm } from "@/global/utils";
import { Translate } from "@/components/Translate";
import { useDebounce } from "@/global/hooks";
import { TSortDirection } from "./_interfaces";
import { useSubServices } from "@/pages/api/hooks/useSubService";
import { ESpinnerType, WithSpinner } from "@/components/Spinner";
import { TSelectOption } from "@/components/Select/_interfaces";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/Input";
import { Disclosure, Transition } from "@headlessui/react";
// import { ChevronUpIcon } from "@heroicons/react/20/solid";

const tableColumns: TTableColumn<ISubServiceModel>[] = [
  { key: "label", header: "common.table.service", sortable: false },
  { key: "price", header: "common.table.price", sortable: true },
];

const limitOptions = [
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "3000", label: "3000" },
];

export const SubServiceContainer = () => {
  const searchParams = useSearchParams();
  const initSearch = searchParams.get("search");
  const { t } = useTranslation("common");
  const [searchValue, setSearchValue] = useState(initSearch || "");
  const [page, setPage] = useState(1);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [limit, setLimit] = useState<{ value: string; label: string }>(
    limitOptions[2],
  );
  const [sortCol, setSortCol] = useState<keyof ISubServiceModel | null>(null);
  const [sortDir, setSortDir] = useState<TSortDirection>(null);

  const {
    data: respData,
    isPending,
    isError,
    isLoading,
    isFetching,
  } = useSubServices({
    search: debouncedSearchValue,
    page,
    limit: Number(limit.value),
    sortField: sortCol,
    sortOrder: sortDir,
  });
  const prevBtnDisabled = respData?.currentPage
    ? respData.currentPage <= 1
    : true;
  const nextBtnDisabled =
    respData?.currentPage && respData?.totalPages
      ? respData?.currentPage === respData.totalPages
      : true;

  const onSearch = (e: string) => {
    setPage(1);
    setSearchValue(e);
  };

  const onSetLimit = (option: TSelectOption) => {
    setPage(1);
    setLimit(option);
  };

  const renderTableHeader = useCallback(
    (
      columns: TTableColumn<ISubServiceModel>[],
      onSort: (column: TTableColumn<ISubServiceModel>) => void,
    ): ReactNode => {
      return (
        <div className={cnm("flex justify-between px-4")}>
          {columns.map((column) => (
            <div
              className={cnm(
                "p-2 text-left font-extrabold text-base text-dark cursor-pointer",
              )}
              key={column.key.toString()}
              onClick={() => onSort(column)}
            >
              <span className="flex items-center">
                <Translate className=" text-md" i18nKey={column.header} />
                {/* {getSortIcon(column)} */}
                <span />
              </span>
            </div>
          ))}
        </div>
      );
    },
    [],
  );

  const renderTableBody = (
    data:
      | ISubServiceModel[]
      | Record<string, ISubServiceModel[]>
      | Record<string, Record<string, ISubServiceModel[]>>
      | null
      | undefined,
    columns: TTableColumn<ISubServiceModel>[],
  ) => {
    if (isFetching) {
      return <WithSpinner type={ESpinnerType.BASE} />;
    }

    if (isError || !data || !Object.keys(data).length) {
      return (
        <>
          <div>
            <div className=" text-center">
              <span className="text-dark text-base font-comfortaa font-bold">
                {t("common.noData")}
              </span>
            </div>
          </div>
        </>
      );
    }

    if (Array.isArray(data)) {
      return (
        <>
          {data.map((subservice) => (
            <TableRow
              className=" border-b border-bkg-frg/20 border-solid"
              key={subservice._id}
            >
              {columns.map((column) => {
                if (column.key === "price") {
                  return (
                    <TableCell className="" key={column.key.toString()}>
                      <span>{column.key}</span>
                    </TableCell>
                  );
                }
                return (
                  <TableCell className="" key={column.key.toString()}>
                    <Translate i18nKey={subservice[column.key]?.toString()} />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </>
      );
    }

    return (
      <>
        {Object.entries(data).map(([category, item]) => {
          if (typeof item === "object" && item !== null) {
            return (
              <div key={category}>
                <div className=" text-center">
                  <Disclosure key={category}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full mb-1 transition-colors duration-200 ease-in-out justify-between bg-primary/60 rounded-lg px-4 py-2 text-left text-sm font-medium text-white hover:bg-primary/50 focus:outline-none focus-visible:ring focus-visible:ring-dark focus-visible:ring-opacity-75">
                          <Translate
                            as="span"
                            i18nKey={`services.title.${category}`}
                            className="text-base md:text-xl font-bold"
                          />
                          {/* <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-white`}
                      /> */}
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-1 pb-1 text-sm text-gray-500">
                          {Object.entries(item).map(
                            ([subCategory, subServices]) => {
                              if (
                                Array.isArray(subServices) &&
                                subServices.length > 0
                              ) {
                                return (
                                  <Fragment key={subCategory}>
                                    {subCategory !== "base" && (
                                      <div className="text-white text-left bg-primary/40 rounded-lg px-2 my-2 font-bold text-base md:text-xl">
                                        <div>
                                          <Translate
                                            as="span"
                                            i18nKey={`${subCategory}`}
                                          />
                                        </div>
                                      </div>
                                    )}
                                    {subServices.map((subservice, index) => (
                                      <div
                                        className={`${
                                          index < subServices.length - 1
                                            ? "border-b"
                                            : null
                                        }  flex justify-between px-4 py-1 border-bkg-frg/10 border-solid`}
                                        key={subservice._id}
                                      >
                                        {columns.map((column) => {
                                          if (column.key === "price") {
                                            return (
                                              <div
                                                className="min-w-[120px] text-dark/90 text-right"
                                                key={column.key.toString()}
                                              >
                                                {subservice.pricePrefix && (
                                                  <span>
                                                    {t(subservice.pricePrefix)}
                                                  </span>
                                                )}{" "}
                                                <span>
                                                  {subservice[column.key]}
                                                </span>
                                                {subservice.priceSuffix && (
                                                  <span>
                                                    {" "}
                                                    {t(subservice.priceSuffix)}
                                                  </span>
                                                )}
                                              </div>
                                            );
                                          }

                                          return (
                                            <div
                                              className="text-dark text-sm md:text-base text-left"
                                              key={column.key.toString()}
                                            >
                                              <Translate
                                                i18nKey={subservice[
                                                  column.key
                                                ]?.toString()}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    ))}
                                  </Fragment>
                                );
                              }
                            },
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            );
          }
          if (Array.isArray(item) && item.length > 0) {
            return (
              <Disclosure key={category}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between bg-dark/80 px-4 py-2 text-left text-sm font-medium text-white hover:bg-dark/90 focus:outline-none focus-visible:ring focus-visible:ring-dark focus-visible:ring-opacity-75">
                      <Translate
                        as="span"
                        i18nKey={`services.title.${category}`}
                        className="text-base md:text-xl font-bold"
                      />
                      {/* <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-white`}
                      /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      {item.map((subservice) => (
                        <TableRow
                          className="border-b border-bkg-frg/20 border-solid"
                          key={subservice._id}
                        >
                          {columns.map((column) => {
                            if (column.key === "price") {
                              return (
                                <TableCell
                                  className="min-w-[120px] text-dark/90"
                                  key={column.key.toString()}
                                >
                                  <span>{subservice[column.key]}</span>
                                </TableCell>
                              );
                            }

                            return (
                              <TableCell
                                className="text-dark text-sm md:text-base"
                                key={column.key.toString()}
                              >
                                <Translate
                                  i18nKey={subservice[column.key]?.toString()}
                                />
                                <p>{subservice._id}</p>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            );
          }
        })}
      </>
    );
  };

  if (isPending) return <WithSpinner type={ESpinnerType.FULL_SCREEN} />;

  return (
    <div className="h-full  bg-lightShade">
      <div className="px-2 bg-light mb-2 rounded-lg h-[72px] flex items-center">
        <PageTitle title="common.price" className="w-[280px] md:w-[340px] " />
      </div>
      <div className=" flex flex-auto flex-col h-[calc(100%-72px-0.5rem)]">
        <form
          className="flex mb-2 space-x-4 bg-light rounded-lg "
          action="#"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-full">
            <Input
              compType="default"
              inputClassName="text-dark bg-light border-[1px] border-dark/20 p-2 text-base w-60 shrink-0 w-full focus:border-primary focus:outline-none"
              inputType="default"
              labelType="default"
              onChange={(e) => onSearch(e.target.value)}
              placeholder={t("common.search") || ""}
              value={searchValue}
              wrapperClassName=""
              wrapperType="default"
            />
          </div>
        </form>
        <div className=" overflow-y-auto no-scrollbar bg-light rounded-lg h-full relative">
          {!isError && !isPending && (
            <div className="bg-light rounded-lg ">
              <div className="max-w-[1200px] flex flex-col ml-auto mr-auto">
                {renderTableHeader(tableColumns, () => {})}

                {renderTableBody(respData?.data, tableColumns)}
              </div>
            </div>
          )}
        </div>
        {/* <div className="flex justify-between bg-light rounded-lg mt-2">
          <div className="flex items-center text-sm sm:text-base text-dark break-words">
            <WithSelect
              btnCN="h-full"
              label="Size"
              onChange={onSetLimit}
              options={limitOptions}
              value={limit}
            />
            <p className="ml-2 text-dark/70">{t("common.items.perPage")}</p>
          </div>
          <div className="flex">
            <ArrowLeft
              onClick={() => !prevBtnDisabled && setPage((prev) => prev - 1)}
              classNameArrow={`w-5 h-5 ${
                prevBtnDisabled ? "text-dark/30" : "text-dark/80"
              } `}
              classNameWrapper="cursor-pointer flex items-center rounded-lg justify-center h-[42px] w-[42px] bg-light border "
            />
            <ArrowRight
              onClick={() => !nextBtnDisabled && setPage((prev) => prev + 1)}
              classNameArrow={`w-5 h-5 ${
                nextBtnDisabled ? "text-dark/30" : "text-dark/80"
              } `}
              classNameWrapper="cursor-pointer  flex items-center rounded-lg justify-center h-[42px] w-[42px] bg-light border ml-3 md:ml-4"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};
