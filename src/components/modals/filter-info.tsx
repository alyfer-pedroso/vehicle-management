import { useState, type FC } from "react";
import { Info } from "lucide-react";

import { useFilterForm } from "@/hooks";
import { Button, DialogProvider } from "@/components/ui";

export const FilterInfo: FC = () => {
  const { resetFilter } = useFilterForm();
  const [open, setOpen] = useState(false);

  const reset = () => {
    resetFilter();
    setOpen(false);
  };

  return (
    <DialogProvider.Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogProvider.DialogTrigger title="Informações sobre o filtro">
        <Info className="text-white cursor-pointer hover:opacity-60" />
      </DialogProvider.DialogTrigger>
      <DialogProvider.DialogContent className=" bg-blue-20 text-white">
        <DialogProvider.DialogHeader>
          <DialogProvider.DialogTitle>Informações sobre o filtro</DialogProvider.DialogTitle>
          <DialogProvider.DialogDescription className="text-gray-20">Sobre o funcionamento do filtro</DialogProvider.DialogDescription>
        </DialogProvider.DialogHeader>
        <div className="text-gray-300">
          <p>
            Para fazer qualquer tipo de busca em relação ao fitro de veículos (Rastreados, Outros e Busca por placa ou frota), basta clicar em 'Novo'.
          </p>

          <div className="flex items-center">
            <span>Se necessário, basta resetar o seu filtro!</span>
            <Button onClick={reset} className="ml-auto bg-blue-40 hover:bg-blue-30 cursor-pointer py-[1.4rem] mt-2 rounded-lg ">
              Resetar filtro
            </Button>
          </div>
        </div>
        <DialogProvider.DialogClose className="w-full bg-blue-40 text-sm font-medium hover:bg-blue-30 cursor-pointer py-[0.775rem] rounded-lg">
          Fechar
        </DialogProvider.DialogClose>
      </DialogProvider.DialogContent>
    </DialogProvider.Dialog>
  );
};
