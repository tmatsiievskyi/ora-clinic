import { IFindAllSubservicesApiResp } from "@/global/api/_interfaces";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

type TUseSubservice = {
  page: number;
  limit: number;
  sortField?: string | null;
  sortOrder?: string | null;
  search: string;
};

const fetchSubservice = async ({
  search,
  page,
  limit,
  sortField,
  sortOrder,
}: Omit<TUseSubservice, "initialData">) => {
  const res = await fetch(
    `/api/sub-service?search=${search}&page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`,
  );
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return (await res.json()) as unknown as IFindAllSubservicesApiResp;
};

export const useSubServices = ({
  page = 1,
  limit,
  sortField,
  sortOrder,
  search,
}: TUseSubservice) => {
  const { data, isPending, isError, isLoading, isFetching } = useQuery({
    queryKey: ["subservices", { search, page, limit, sortField, sortOrder }],
    queryFn: () =>
      fetchSubservice({ search, page, limit, sortField, sortOrder }),
    placeholderData: keepPreviousData,
    // initialData,
  });
  return { data, isPending, isError, isLoading, isFetching };
};
