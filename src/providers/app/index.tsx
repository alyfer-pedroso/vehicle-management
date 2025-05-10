import type { FC } from "react";

import { VehiclesProvider } from "@/providers";
import { Toaster } from "@/components/ui";

export const AppProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <VehiclesProvider>
      {children}
      <Toaster />
    </VehiclesProvider>
  );
};
