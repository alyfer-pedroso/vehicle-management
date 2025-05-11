import { memo, type ComponentProps, type FC } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import type { LocationVehicle } from "@/models/vehicles";
import { DEFAULT_CENTER } from "@/constants/google";

import { VehicleMarker } from "@/components/template";

const API_KEY = import.meta.env.VITE_GOOGLEAPI;

interface props {
  googleMap?: ComponentProps<typeof GoogleMap>;
  markers?: LocationVehicle[];
  loadingElement?: React.ReactNode;
}

export const Maps: FC<props> = memo(({ googleMap, ...props }) => {
  return (
    <LoadScript googleMapsApiKey={API_KEY} language="pt-BR" loadingElement={props?.loadingElement}>
      <GoogleMap zoom={10} {...googleMap} center={googleMap?.center ?? DEFAULT_CENTER}>
        {props?.markers?.map((data) => (
          <VehicleMarker key={data?.id} {...data} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
});
