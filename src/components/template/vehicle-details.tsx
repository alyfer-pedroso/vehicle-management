import { memo, type FC } from "react";
import type { LocationVehicle } from "@/models/vehicles";

interface props {
  data: LocationVehicle;
  close: VoidFunction;
}

export const VehicleDetails: FC<props> = memo(({ close, data }) => {
  const googleMapsURL = `https://www.google.com/maps?q=${data.lat},${data.lng}`;

  return (
    <div className="relative bg-blue-15 border text-xs border-blue-30 rounded-lg pb-2 px-2 pt-3 flex flex-col gap-0.5 text-white min-w-[200px] text-center">
      <button className="absolute top-1 right-2 text-blue-40 text-base font-medium cursor-pointer" onClick={close} title="Fechar">
        X
      </button>

      <p>Placa {data.plate}</p>
      <p>Frota {data?.fleet === "string" ? "Sem frota" : data.fleet ?? "Sem frota"}</p>
      <p>{new Date(data.createdAt).toLocaleString()}</p>
      <a href={googleMapsURL} target="_blank" className="underline">
        {data.lat}, {data.lng}
      </a>

      <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 size-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[15px] border-b-blue-30 rotate-180"></div>
    </div>
  );
});
