import type { FC } from "react";

import type { useFilterForm } from "@/hooks";
import { RadioInput } from "@/components/template";
import { Type } from "@/models/api";

interface props {
  filterForm: ReturnType<typeof useFilterForm>;
}

export const FilterList: FC<props> = ({ filterForm }) => {
  const { register } = filterForm;

  return (
    <div className="min-w-1/4 flex justify-between gap-4">
      <h2 className="text-white font-semibold text-[1.1rem]">Lista</h2>

      <div className="flex items-center gap-4.5">
        <RadioInput {...register("type")} value={Type.TRACKED} labelText="Rastreados" />
        <RadioInput {...register("type")} value={Type.OTHERS} labelText="Outros" />
      </div>
    </div>
  );
};
