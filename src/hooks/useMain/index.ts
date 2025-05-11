import { useInfiniteQuery } from "@tanstack/react-query";

import { useFilterForm } from "@/hooks";
import { getVehicles } from "@/services/vehicles";

export function useMain() {
  const { typeParam, filterParam } = useFilterForm();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["get-tags", typeParam, filterParam],
    queryFn: ({ pageParam = 1 }) => getVehicles({ page: pageParam, type: typeParam, filter: filterParam, perPage: 20 }),
    getNextPageParam: (lastPage) => (lastPage.content.page < lastPage.content.totalPages ? lastPage.content.page + 1 : undefined),
    initialPageParam: 1,
  });

  const onScrollEnd = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    onScrollEnd,
    data,
    locationVehicles: data?.pages.flatMap((page) => (page.content.locationVehicles ?? []).filter((lv) => lv !== undefined)) ?? [],
    vehicles: data?.pages.flatMap((page) => page.content.vehicles).filter((v) => v !== undefined) ?? [],
    isFetchingNextPage,
    isLoading,
  };
}
