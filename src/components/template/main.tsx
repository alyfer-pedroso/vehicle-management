import { useMemo, type FC } from "react";

import { useMain } from "@/hooks";
import { Filters, InfiniteScroll, Map, VehiclesTable } from "@/components/template";
import { cn, isMobileDevice } from "@/lib/utils";

export const Main: FC = () => {
  const { onScrollEnd, vehicles, locationVehicles, ...rest } = useMain();
  const isNotMobile = useMemo(() => !isMobileDevice(), []);

  return (
    <InfiniteScroll onScrollEnd={onScrollEnd} loading={false} className={cn("w-full max-h-full overflow-y-auto", { scrollstyled: isNotMobile })}>
      <main className="w-full max-w-[1188px] mx-auto px-6 sm:px-9.5 pb-[58.39px]">
        <Filters />
        <Map locationVehicles={locationVehicles} {...rest} />
        <VehiclesTable vehicles={vehicles} {...rest} />
      </main>
    </InfiniteScroll>
  );
};
