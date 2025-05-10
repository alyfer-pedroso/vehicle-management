import type { FC } from "react";
import { Filters, Map } from "@/components/template";

export const Main: FC = () => {
  return (
    <main className="w-full max-w-[1188px] mx-auto pl-6 pr-3 sm:pl-9.5 sm:pr-[1.1875rem]">
      <Filters />
      <Map />
    </main>
  );
};
