import type { FC } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { App } from "@/components/template";

const routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "*", element: <Navigate to="/?type=tracked" /> },
]);

export const MainRouter: FC = () => {
  return <RouterProvider router={routes} />;
};
