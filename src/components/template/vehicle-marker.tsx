import { memo, useState, type FC } from "react";
import { Marker, OverlayView } from "@react-google-maps/api";

import { MarkerIcon } from "@/components/google";
import { VehicleDetails } from "@/components/template";

import { markerColorByIgnition } from "@/constants/vehicle";
import type { LocationVehicle } from "@/models/vehicles";

export const VehicleMarker: FC<LocationVehicle> = memo(({ ...props }) => {
  const { lat, lng } = props;
  const [showModal, setShowModal] = useState(false);

  const close = () => setShowModal(false);

  const handleClick = () => {
    setShowModal((state) => !state);
  };

  return (
    <>
      <Marker
        title="Clique para ver detalhes do veículo"
        onClick={handleClick}
        position={{ lat, lng }}
        icon={{
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(MarkerIcon(markerColorByIgnition[props.ignition])),
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />

      {showModal && (
        <OverlayView position={{ lat, lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className="absolute -translate-x-1/2 -translate-y-full left-1/2 -bottom-7">
            <VehicleDetails data={props} close={close} />
          </div>
        </OverlayView>
      )}
    </>
  );
});
