/* eslint-disable react-refresh/only-export-components */
import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
}

function TestProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  if (options?.route) {
    window.history.pushState({}, "Test page", options.route);
  }

  return render(ui, { wrapper: TestProviders, ...options });
};

// Re-export everything from RTL
export * from "@testing-library/react";
export { customRender as render };
