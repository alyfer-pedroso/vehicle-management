import { memo, type ComponentProps, type FC } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import type { LocationVehicle } from "@/models/vehicles";
import { DEFAULT_CENTER } from "@/constants/google";
import { GOOGLE_API_KEY } from "@/constants/env";

import { VehicleMarker } from "@/components/template";

interface props {
  googleMap?: ComponentProps<typeof GoogleMap>;
  markers?: LocationVehicle[];
  loadingElement?: React.ReactNode;
}

export const Maps: FC<props> = memo(({ googleMap, ...props }) => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} language="pt-BR" loadingElement={props?.loadingElement}>
      <GoogleMap zoom={10} {...googleMap} center={googleMap?.center ?? DEFAULT_CENTER}>
        {props?.markers?.map((data, idx) => (
          //? passando a key como idx, pois tem ids do retorno que estao duplicados
          <VehicleMarker key={idx} {...data} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
});
