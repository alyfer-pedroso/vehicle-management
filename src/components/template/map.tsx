import type { FC } from "react";

import { Container, Loading } from "@/components/template";
import { Maps } from "@/components/google";

const tempMarkers = [
  { id: "1", lat: -23.55052, lng: -46.633308 },
  { id: "2", lat: -23.559616, lng: -46.658392 },
  { id: "3", lat: -23.543178, lng: -46.629185 },
];

export const Map: FC = () => {
  return (
    <Container className="p-3">
      <h2 className="text-white font-semibold text-[1.1rem] ml-2">Mapa rastreador</h2>

      <Maps
        markers={tempMarkers}
        googleMap={{ mapContainerClassName: "min-h-[50dvh] rounded-2xl mt-4", zoom: 12, clickableIcons: false, center: tempMarkers[1] }}
        loadingElement={<Loading className="w-full min-h-[50dvh]" />}
      />
    </Container>
  );
};
