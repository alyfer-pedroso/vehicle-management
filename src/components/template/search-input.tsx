import type { FC } from "react";
import { Input } from "@/components/ui";

export const SearchInput: FC = () => {
  return (
    <Input
      title="Buscar por placa ou frota"
      placeholder="Buscar por placa ou frota"
      className="w-full max-w-92 rounded-lg [font-family:'Inter'] py-[1.4rem] text-white font-light  border-gray-10  placeholder:text-gray-20"
    />
  );
};
