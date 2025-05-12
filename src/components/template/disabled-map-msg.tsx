import type { FC } from "react";
import { Frown } from "lucide-react";

export const DisabledMapMsg: FC = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-blue-20 text-white rounded-xl p-4 cursor-not-allowed">
      <Frown className="size-14 text-white text-center" />
      <p className="text-center">Sem veículos rastreados!</p>
    </div>
  );
};
