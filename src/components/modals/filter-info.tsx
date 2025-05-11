import { type FC } from "react";
import { Info } from "lucide-react";

import { DialogProvider } from "@/components/ui";

export const FilterInfo: FC = () => {
  return (
    <DialogProvider.Dialog modal={true}>
      <DialogProvider.DialogTrigger title="Informações sobre o filtro">
        <Info className="text-white cursor-pointer hover:opacity-60" />
      </DialogProvider.DialogTrigger>
      <DialogProvider.DialogContent className="bg-blue-20 text-white">
        <DialogProvider.DialogHeader>
          <DialogProvider.DialogTitle>Informações sobre o filtro</DialogProvider.DialogTitle>
          <DialogProvider.DialogDescription className="text-gray-20">Sobre o funcionamento do filtro</DialogProvider.DialogDescription>
        </DialogProvider.DialogHeader>
        <div>
          <p className="text-gray-300">
            Para fazer qualquer tipo de busca em relação ao fitro de veículos (Rastreados, Outros e Busca por placa ou frota), basta clicar em 'Novo'.
          </p>
        </div>
        <DialogProvider.DialogClose className="w-full bg-blue-40 text-sm font-medium hover:bg-blue-30 cursor-pointer py-[0.775rem] rounded-lg">
          Fechar
        </DialogProvider.DialogClose>
      </DialogProvider.DialogContent>
    </DialogProvider.Dialog>
  );
};
