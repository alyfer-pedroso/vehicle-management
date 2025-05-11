import type { FC } from "react";

import { Marker } from "@/components/google";
import type { LocationVehicle } from "@/models/vehicles";
import { markerColorByIgnition } from "@/constants/vehicle";

export const VehicleMarker: FC<LocationVehicle> = ({ ...props }) => {
  const { lat, lng } = props;

  return <Marker position={{ lat, lng }} color={markerColorByIgnition[props.ignition]} />;
};
