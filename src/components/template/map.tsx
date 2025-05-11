import { memo, type FC } from "react";

import { Container, DisabledMapMsg, Loading } from "@/components/template";
import { Maps } from "@/components/google";
import type { LocationVehicle } from "@/models/vehicles";
import { cn } from "@/lib/utils";

interface props {
  locationVehicles: LocationVehicle[];
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
}

export const Map: FC<props> = memo(({ locationVehicles, ...props }) => {
  const isLoading = props?.isLoading || props?.isFetchingNextPage;

  return (
    <Container className="p-3 relative">
      <h2 className="text-white font-semibold text-[1.1rem] ml-2">Mapa rastreador</h2>

      {Boolean(!locationVehicles.length && !isLoading) && <DisabledMapMsg />}

      <Loading
        className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden [&>svg]:text-blue-20", {
          flex: isLoading,
        })}
      />

      <div className={cn("relative w-full", { "blur-[2px]": !locationVehicles.length || isLoading })}>
        <div className={cn("w-full h-full absolute top-0 left-0 z-20 cursor-not-allowed hidden", { block: !locationVehicles.length || isLoading })} />

        <Maps
          markers={locationVehicles}
          googleMap={{ mapContainerClassName: "min-h-[50dvh] rounded-2xl mt-4", zoom: 12, clickableIcons: false, center: locationVehicles[1] }}
          loadingElement={<Loading className="w-full min-h-[50dvh]" />}
        />
      </div>
    </Container>
  );
});
