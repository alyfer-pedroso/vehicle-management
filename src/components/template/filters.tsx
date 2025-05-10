import type { FC } from "react";

import { Container, RadioInput, SearchInput } from "@/components/template";
import { Button } from "@/components/ui";

export const Filters: FC = () => {
  return (
    <Container className="border-0 rounded-none bg-transparent w-full flex flex-wrap justify-between items-center gap-4 pt-8 pb-5.5  border-b border-blue-30">
      <div className="min-w-1/4 flex justify-between gap-4">
        <h2 className="text-white font-semibold text-[1.1rem]">Lista</h2>

        <div className="flex items-center gap-4.5">
          <RadioInput id="tracked" name="list" labelText="Rastreados" defaultChecked />
          <RadioInput id="others" name="list" labelText="Outros" />
        </div>
      </div>

      <div className="min-w-1/2 flex justify-end gap-4">
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
    </Container>
  );
};
