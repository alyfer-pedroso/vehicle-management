import { useMemo, type FC } from "react";

import { useMain } from "@/hooks";
import { Filters, InfiniteScroll, Map, VehiclesTable } from "@/components/template";
import { cn, isMobileDevice } from "@/lib/utils";

export const Main: FC = () => {
  const { onScrollEnd } = useMain();
  const isNotMobile = useMemo(() => !isMobileDevice(), []);

  return (
    <InfiniteScroll onScrollEnd={onScrollEnd} loading={false} className={cn("w-full max-h-full overflow-y-auto", { scrollstyled: isNotMobile })}>
      {/* <InfiniteScroll className={cn("w-full max-h-full overflow-y-auto", { scrollstyled: isNotMobile })}> */}
      {/* <div className="w-ful max-w-[1188px] mx-auto pl-6 pr-3 sm:pl-9.5 sm:pr-[1.1875rem] pb-[58.39px]"> */}
      <main className="w-full max-w-[1188px] mx-auto px-6 sm:px-9.5 pb-[58.39px]">
        <Filters />
        <Map />
        <VehiclesTable />
      </main>
    </InfiniteScroll>
  );
};
