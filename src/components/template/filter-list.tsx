import type { FC } from "react";

import { useType } from "@/hooks";
import { RadioInput } from "@/components/template";

export const FilterList: FC = () => {
  const { typeList } = useType();

  return (
    <div className="min-w-1/4 flex justify-between gap-4">
      <h2 className="text-white font-semibold text-[1.1rem]">Lista</h2>

      <div className="flex items-center gap-4.5">
        {typeList.map((item) => (
          <RadioInput key={item.id} {...item} name="list" labelText={item.label} />
        ))}
      </div>
    </div>
  );
};
