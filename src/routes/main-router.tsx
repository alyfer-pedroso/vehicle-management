import type { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "@/components/template";

const routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "*", element: <App /> },
]);

export const MainRouter: FC = () => {
  return <RouterProvider router={routes} />;
};
