import type { FC } from "react";

import { Container } from "@/components/template";
import { TableProvider } from "@/components/ui";
import type { Vehicle } from "@/models/vehicles";

interface props {
  vehicles?: Vehicle[];
}

export const VehiclesTable: FC<props> = ({ vehicles }) => {
  return (
    <Container className="overflow-hidden">
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
              <TableProvider.TableCell>{value?.fleet ?? "Sem frota"}</TableProvider.TableCell>
              <TableProvider.TableCell>{value.type}</TableProvider.TableCell>
              <TableProvider.TableCell>{value.model}</TableProvider.TableCell>
              <TableProvider.TableCell>{value.status}</TableProvider.TableCell>
            </TableProvider.TableRow>
          ))}
        </TableProvider.TableBody>
      </TableProvider.Table>
    </Container>
  );
};
