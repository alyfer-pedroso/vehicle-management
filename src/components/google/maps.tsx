import type { ComponentProps, FC } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import type { MapProps } from "@/models/google";
import { DEFAULT_CENTER } from "@/constants/google";

import { Marker } from "@/components/google";

const API_KEY = import.meta.env.VITE_GOOGLEAPI;

interface props extends MapProps {
  googleMap?: ComponentProps<typeof GoogleMap>;
  loadingElement?: React.ReactNode;
}

export const Maps: FC<props> = ({ googleMap, ...props }) => {
  return (
    <LoadScript googleMapsApiKey={API_KEY} language="pt-BR" loadingElement={props?.loadingElement}>
      <GoogleMap zoom={10} {...googleMap} center={googleMap?.center ?? DEFAULT_CENTER}>
        {props?.markers.map(({ id, ...pos }) => (
          <Marker color="red" key={id} position={pos} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
