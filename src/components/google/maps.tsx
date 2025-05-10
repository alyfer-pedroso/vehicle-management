import type { ComponentProps, FC } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import type { MapProps } from "@/models/google";
import { DEFAULT_CENTER } from "@/constants/google";
import { Loading } from "@/components/template";

const API_KEY = import.meta.env.VITE_GOOGLEAPI;

interface props extends MapProps {
  googleMap?: ComponentProps<typeof GoogleMap>;
}

export const Maps: FC<props> = ({ googleMap, ...props }) => {
  return (
    <LoadScript googleMapsApiKey={API_KEY} language="pt-BR" loadingElement={<Loading className="w-full h-full" />}>
      <GoogleMap center={DEFAULT_CENTER} zoom={10} {...googleMap}>
        {props?.markers.map(({ id, ...pos }) => (
          <Marker key={id} position={pos} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
