import type { FC } from "react";
import { Container } from "@/components/template";
import { TableProvider } from "@/components/ui";

export const VehiclesTable: FC = () => {
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
          {Array.from({ length: 5 }).map((_, i) => (
            <TableProvider.TableRow key={i}>
              <TableProvider.TableCell>EAD 7328</TableProvider.TableCell>
              <TableProvider.TableCell>000001</TableProvider.TableCell>
              <TableProvider.TableCell>Implemento</TableProvider.TableCell>
              <TableProvider.TableCell>F MAX Select</TableProvider.TableCell>
              <TableProvider.TableCell>Em manuntenção</TableProvider.TableCell>
            </TableProvider.TableRow>
          ))}
        </TableProvider.TableBody>
      </TableProvider.Table>
    </Container>
  );
};
