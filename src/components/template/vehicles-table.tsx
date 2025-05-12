import { memo, type FC } from "react";

import { Container, Loading } from "@/components/template";
import { TableProvider } from "@/components/ui";
import type { Vehicle } from "@/models/vehicles";
import { cn } from "@/lib/utils";

interface props {
  vehicles?: Vehicle[];
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
}

export const VehiclesTable: FC<props> = memo(({ vehicles, ...props }) => {
  const disabled = !vehicles?.length && !props.isFetchingNextPage && !props.isLoading;

  if (props.isLoading) {
    return <Loading className="w-full" />;
  }

  return (
    <Container className={cn("relative overflow-hidden", { "blur-[1px]": props.isFetchingNextPage })}>
      {props.isFetchingNextPage && <Loading className="w-full h-full absolute top-0 left-0 items-end pb-[25%]" />}

      <TableProvider.Table>
        <TableProvider.TableHeader>
          <TableProvider.TableRow>
            <TableProvider.TableHead>Placa</TableProvider.TableHead>
            <TableProvider.TableHead>Frota</TableProvider.TableHead>
            <TableProvider.TableHead>Tipo</TableProvider.TableHead>
            <TableProvider.TableHead>Modelo</TableProvider.TableHead>
            <TableProvider.TableHead>Status</TableProvider.TableHead>
          </TableProvider.TableRow>
        </TableProvider.TableHeader>

        <TableProvider.TableBody>
          {vehicles?.map((value) => (
            <TableProvider.TableRow key={value.id}>
              <TableProvider.TableCell>{value.plate}</TableProvider.TableCell>
              <TableProvider.TableCell>{value?.fleet === "string" ? "Sem frota" : value.fleet ?? "Sem frota"}</TableProvider.TableCell>
              <TableProvider.TableCell>{value.type}</TableProvider.TableCell>
              <TableProvider.TableCell>{value.model}</TableProvider.TableCell>
              <TableProvider.TableCell>{value.status}</TableProvider.TableCell>
            </TableProvider.TableRow>
          ))}

          {disabled && (
            <TableProvider.TableRow>
              <TableProvider.TableCell colSpan={5}>Nenhum veículo encontrado!</TableProvider.TableCell>
            </TableProvider.TableRow>
          )}
        </TableProvider.TableBody>
      </TableProvider.Table>
    </Container>
  );
});
