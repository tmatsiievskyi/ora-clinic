import { Fragment, ReactNode, useCallback, useState } from "react";
import { useTranslation } from "next-i18next";
import { PageTitle } from "@/components/PageTitle";
import { WithTable } from "@/components/Table";
import { TTableColumn } from "@/components/Table/_types";
import { ISubServiceModel } from "@/global/models/_interfaces";
import {
  TableCell,
  TableHead,
  TableRow,
} from "@/components/Table/Table.component";
import { cnm } from "@/global/utils";
import { Translate } from "@/components/Translate";
import { useDebounce } from "@/global/hooks";
import { TSortDirection } from "./_interfaces";
import { useSubServices } from "@/pages/api/hooks/useSubService";
import { ArrowLeft, ArrowRight } from "@/UI/Arrows";
import { WithSelect } from "@/components/Select";
import { ESpinnerType, WithSpinner } from "@/components/Spinner";
import { TSelectOption } from "@/components/Select/_interfaces";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/Input";

const tableColumns: TTableColumn<ISubServiceModel>[] = [
  { key: "label", header: "common.table.service", sortable: false },
  { key: "price", header: "common.table.price", sortable: true },
];

const limitOptions = [
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

export const SubServiceContainer = () => {
  const searchParams = useSearchParams();
  const initSearch = searchParams.get("search");
  const { t } = useTranslation("common");
  const [searchValue, setSearchValue] = useState(initSearch || "");
  const [page, setPage] = useState(1);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [limit, setLimit] = useState<{ value: string; label: string }>(
    limitOptions[0],
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
        <TableRow className={cnm("")}>
          {columns.map((column) => (
            <TableHead
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
            </TableHead>
          ))}
        </TableRow>
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
          <TableRow>
            <TableCell className=" text-center" colSpan={2}>
              <span className="text-dark text-base font-comfortaa font-bold">
                {t("common.noData")}
              </span>
            </TableCell>
          </TableRow>
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
              <>
                <TableRow className=" text-white text-center odd:bg-dark/80 bg-dark/80 font-bold text-base md:text-xl">
                  <TableCell colSpan={2}>
                    <Translate
                      as="span"
                      i18nKey={`services.title.${category}`}
                    />
                  </TableCell>
                </TableRow>
                {Object.entries(item).map(([subCategory, subServices]) => {
                  if (Array.isArray(subServices) && subServices.length > 0) {
                    return (
                      <>
                        {subCategory !== "base" && (
                          <TableRow className=" text-white text-left bg-dark/40  font-bold text-base md:text-xl">
                            <TableCell colSpan={2}>
                              <Translate as="span" i18nKey={`${subCategory}`} />
                            </TableCell>
                          </TableRow>
                        )}

                        <Fragment key={subCategory}>
                          {subServices.map((subservice) => (
                            <TableRow
                              className=" border-b border-bkg-frg/20 border-solid"
                              key={subservice._id}
                            >
                              {columns.map((column) => {
                                if (column.key === "price") {
                                  return (
                                    <TableCell
                                      className="min-w-[120px] text-dark/90"
                                      key={column.key.toString()}
                                    >
                                      {subservice.pricePrefix && (
                                        <span>{t(subservice.pricePrefix)}</span>
                                      )}{" "}
                                      <span>{subservice[column.key]}</span>
                                      {subservice.priceSuffix && (
                                        <span>
                                          {" "}
                                          {t(subservice.priceSuffix)}
                                        </span>
                                      )}
                                    </TableCell>
                                  );
                                }

                                return (
                                  <TableCell
                                    className="text-dark text-sm md:text-base"
                                    key={column.key.toString()}
                                  >
                                    <Translate
                                      i18nKey={subservice[
                                        column.key
                                      ]?.toString()}
                                    />
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          ))}
                        </Fragment>
                      </>
                    );
                  }
                })}
              </>
            );
          }
          if (Array.isArray(item) && item.length > 0) {
            return (
              <Fragment key={category}>
                <TableRow className=" text-dark text-center  font-bold text-base md:text-xl">
                  <Translate as="td" i18nKey={`services.title.${category}`} />
                </TableRow>
                {item.map((subservice) => (
                  <TableRow
                    className=" border-b border-bkg-frg/20 border-solid"
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
              </Fragment>
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
              <WithTable
                columns={tableColumns}
                data={respData?.data}
                renderHeader={renderTableHeader}
                renderBody={renderTableBody}
                tableBodyCN=""
              />
            </div>
          )}
        </div>
        <div className="flex justify-between bg-light rounded-lg mt-2">
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
        </div>
      </div>
    </div>
  );
};
