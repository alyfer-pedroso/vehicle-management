import type { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const vehiclesClient = new QueryClient();

export const VehiclesProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={vehiclesClient}>{children}</QueryClientProvider>;
};
