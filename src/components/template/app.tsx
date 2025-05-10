import type { FC } from "react";

import { Header, Main } from "@/components/template";

export const App: FC = () => {
  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden bg-blue-10">
      <Header />
      <Main />
    </div>
  );
};
