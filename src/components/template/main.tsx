import type { FC } from "react";
import { Filters, Map } from "@/components/template";

export const Main: FC = () => {
  return (
    <main className="w-[calc(100vw-2dvw)] pr-[1dvw] ml-[2dvw]">
      <Filters />
      <Map />
    </main>
  );
};
