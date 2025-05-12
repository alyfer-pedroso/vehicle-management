import { useInfiniteQuery } from "@tanstack/react-query";

import { useFilterForm } from "@/hooks";
import { getVehicles } from "@/services/vehicles";
import { useCallback, useEffect, useRef } from "react";

const TWO_MIN = 120000;
const ALMOST_TWO_MIN = 119000;

export function useMain() {
  const { typeParam, filterParam } = useFilterForm();

  const lastRefetchTime = useRef(new Date());

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching } = useInfiniteQuery({
    queryKey: ["get-tags", typeParam, filterParam],
    queryFn: ({ pageParam = 1 }) => getVehicles({ page: pageParam, type: typeParam, filter: filterParam, perPage: 20 }),
    getNextPageParam: (lastPage) => (lastPage.content.page < lastPage.content.totalPages ? lastPage.content.page + 1 : undefined),
    initialPageParam: 1,
    refetchInterval: TWO_MIN,
    refetchOnWindowFocus: false,
    staleTime: ALMOST_TWO_MIN,
  });

  const onScrollEnd = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const refethingLog = useCallback(() => {
    const now = new Date();
    const timeSinceLastRefetch = Math.round((Number(now) - Number(lastRefetchTime.current)) / 1000);

    console.log(`🔄 Refetching all vehicle data! Time since last refetch: ${timeSinceLastRefetch}s`);
    console.log(`📊 Refetching ${data?.pages.length ?? 0} pages of data`);
    lastRefetchTime.current = now;
  }, [data?.pages.length]);

  useEffect(() => {
    if (isRefetching) refethingLog();
  }, [isRefetching, refethingLog]);

  return {
    onScrollEnd,
    data,
    locationVehicles: data?.pages.flatMap((page) => (page.content.locationVehicles ?? []).filter((lv) => lv !== undefined)) ?? [],
    vehicles: data?.pages.flatMap((page) => page.content.vehicles).filter((v) => v !== undefined) ?? [],
    isFetchingNextPage,
    isLoading,
  };
}
