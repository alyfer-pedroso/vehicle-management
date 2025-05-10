import type { FC } from "react";

import { RadioInput, SearchInput } from "@/components/template";
import { Button } from "@/components/ui";

export const Filters: FC = () => {
  return (
    <section className="w-full flex justify-between items-center pt-8 pb-5.5 mb-4 border-b border-blue-30">
      <div className="basis-1/4 flex justify-between">
        <h2 className="text-white font-semibold text-[1.1rem]">Lista</h2>

        <div className="flex items-center gap-4.5">
          <RadioInput id="tracked" name="list" labelText="Rastreados" />
          <RadioInput id="others" name="list" labelText="Outros" />
        </div>
      </div>

      <div className="basis-1/2 flex justify-end gap-4">
        <SearchInput />

        <Button
          className="
        bg-blue-40
        hover:bg-blue-30
        cursor-pointer
        w-full
        max-w-42
        py-[1.4rem]
        rounded-lg"
        >
          Novo
        </Button>
      </div>
    </section>
  );
};
