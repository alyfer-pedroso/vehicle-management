// Add extended matchers
import "@testing-library/jest-dom";
import React from "react";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => React.createElement("a", { href: to }, children),
}));

// Mock @tanstack/react-query
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useInfiniteQuery: jest.fn(),
}));

// Mock @react-google-maps/api
jest.mock("@react-google-maps/api", () => ({
  Marker: ({ children }: { children: React.ReactNode }) => React.createElement("div", { "data-testid": "google-map-marker" }, children),
  OverlayView: ({ children }: { children: React.ReactNode }) => React.createElement("div", { "data-testid": "google-map-overlay" }, children),
  GoogleMap: ({ children }: { children: React.ReactNode }) => React.createElement("div", { "data-testid": "google-map" }, children),
  useLoadScript: jest.fn().mockReturnValue({ isLoaded: true, loadError: null }),
}));

// Mock axios
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
  isAxiosError: jest.fn(),
}));

// Mock window.google
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

// Mock sonner
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Create a file mock for images/SVGs
global.URL.createObjectURL = jest.fn();
