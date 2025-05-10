import type { FC } from "react";
import { Marker as MK, type MarkerProps } from "@react-google-maps/api";
import { MarkerIcon } from "./marker-icon";

interface props {
  position: MarkerProps["position"];
  color?: string;
}

export const Marker: FC<props> = ({ position, color }) => {
  return (
    <MK
      position={position}
      icon={{
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(MarkerIcon(color)),
        scaledSize: new window.google.maps.Size(60, 60),
      }}
    />
  );
};
