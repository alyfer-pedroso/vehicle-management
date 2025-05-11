import type { FC } from "react";

import { Container, Loading } from "@/components/template";
import { Maps } from "@/components/google";
import type { LocationVehicle } from "@/models/vehicles";

interface props {
  locationVehicles: LocationVehicle[];
}

export const Map: FC<props> = ({ locationVehicles }) => {
  return (
    <Container className="p-3">
      <h2 className="text-white font-semibold text-[1.1rem] ml-2">Mapa rastreador</h2>

      <Maps
        markers={locationVehicles}
        googleMap={{ mapContainerClassName: "min-h-[50dvh] rounded-2xl mt-4", zoom: 12, clickableIcons: false, center: locationVehicles[1] }}
        loadingElement={<Loading className="w-full min-h-[50dvh]" />}
      />
    </Container>
  );
};
