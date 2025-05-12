/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from "@testing-library/react";
import { useFilterForm } from "@/hooks/useFilterForm";
import { useSearchParams } from "react-router-dom";
import { Type } from "@/models/api";

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("@/constants/env", () => ({
  API_BASE_URL: "https://mock-api.test",
  API_TOKEN: "mocked-token",
  GOOGLE_API_KEY: "mocked-google-api-key",
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("useFilterForm", () => {
  const mockSetSearchParams = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();

    mockSearchParams.delete("type");
    mockSearchParams.delete("filter");

    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams, mockSetSearchParams]);
  });

  test("should initialize with default values when no URL params", () => {
    const { result } = renderHook(() => useFilterForm());

    expect(result.current.typeParam).toBe(Type.TRACKED);
    expect(result.current.filterParam).toBe("");

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  test("should use URL params when provided", () => {
    mockSearchParams.set("type", Type.TRACKED);
    mockSearchParams.set("filter", "test-filter");

    const { result } = renderHook(() => useFilterForm());

    expect(result.current.typeParam).toBe(Type.TRACKED);
    expect(result.current.filterParam).toBe("test-filter");
  });

  test("should update search params on form submit", () => {
    const { result } = renderHook(() => useFilterForm());

    const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;

    act(() => {
      const onSubmit = result.current.handleSubmit;

      const formHandler = onSubmit as unknown as (e: React.FormEvent) => void;
      formHandler(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  test("should set type to default when type param is invalid", () => {
    mockSearchParams.set("type", "invalid-type");

    renderHook(() => useFilterForm());

    expect(mockSetSearchParams).toHaveBeenCalled();
    expect(mockSearchParams.get("type")).toBe(Type.TRACKED);
  });

  test("should reset filter when resetFilter is called", () => {
    mockSearchParams.set("type", Type.OTHERS);
    mockSearchParams.set("filter", "test-filter");

    const { result } = renderHook(() => useFilterForm());

    act(() => {
      result.current.resetFilter();
    });

    expect(mockSetSearchParams).toHaveBeenCalled();
    const lastCall = mockSetSearchParams.mock.calls[mockSetSearchParams.mock.calls.length - 1][0];
    expect(lastCall.get("type")).toBe(Type.TRACKED);
    expect(lastCall.has("filter")).toBe(false);
  });

  test("should show toast when form has errors", () => {
    jest.mock("react-hook-form", () => ({
      ...jest.requireActual("react-hook-form"),
      useForm: () => ({
        register: jest.fn(),
        handleSubmit: (_: any, onInvalid: any) => {
          return () => onInvalid({ type: { message: "Type is required" } });
        },
        formState: {
          errors: {
            type: { message: "Type is required" },
          },
        },
      }),
    }));

    jest.resetModules();

    const { result } = renderHook(() => useFilterForm());

    act(() => {
      const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;
      const onSubmit = result.current.handleSubmit;
      const formHandler = onSubmit as unknown as (e: React.FormEvent) => void;
      formHandler(mockEvent);
    });
  });
});
