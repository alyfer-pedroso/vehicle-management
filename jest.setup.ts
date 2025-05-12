import "@testing-library/jest-dom";
import React from "react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => React.createElement("a", { href: to }, children),
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useInfiniteQuery: jest.fn(),
}));

jest.mock("@react-google-maps/api", () => ({
  Marker: ({ children }: { children: React.ReactNode }) => React.createElement("div", { "data-testid": "google-map-marker" }, children),
  OverlayView: ({ children }: { children: React.ReactNode }) => React.createElement("div", { "data-testid": "google-map-overlay" }, children),
  GoogleMap: ({ children }: { children: React.ReactNode }) => React.createElement("div", { "data-testid": "google-map" }, children),
  useLoadScript: jest.fn().mockReturnValue({ isLoaded: true, loadError: null }),
}));

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
  isAxiosError: jest.fn(),
}));

Object.defineProperty(window, "google", {
  value: {
    maps: {
      Size: class {
        constructor(width: number, height: number) {
          return { width, height };
        }
      },
      OverlayView: {
        OVERLAY_MOUSE_TARGET: "OVERLAY_MOUSE_TARGET",
      },
    },
  },
  writable: true,
});

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

global.URL.createObjectURL = jest.fn();
