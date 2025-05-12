import { renderHook, act } from "@testing-library/react";
import { useMain } from "@/hooks/useMain";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFilterForm } from "@/hooks";
import { Type } from "@/models/api";

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock("@/hooks/useFilterForm", () => ({
  useFilterForm: jest.fn(),
}));

jest.mock("@/constants/env", () => ({
  API_BASE_URL: "https://mock-api.test",
  API_TOKEN: "mocked-token",
  GOOGLE_API_KEY: "mocked-google-api-key",
}));

jest.mock("@/services/vehicles", () => ({
  getVehicles: jest.fn(),
}));

const originalConsoleLog = console.log;
const mockConsoleLog = jest.fn();

describe("useMain", () => {
  const mockDate = new Date("2023-01-01T12:00:00Z");

  beforeAll(() => {
    console.log = mockConsoleLog;

    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    } as never;
  });

  afterAll(() => {
    console.log = originalConsoleLog;
    global.Date = Date;
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (useFilterForm as jest.Mock).mockReturnValue({
      typeParam: Type.TRACKED,
      filterParam: "",
    });

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            content: {
              vehicles: [{ id: "1", plate: "ABC1234" }],
              locationVehicles: [{ id: "1", lat: -23.5, lng: -46.6, ignition: "ON" }],
              page: 1,
              totalPages: 2,
              perPage: 20,
            },
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
      isRefetching: false,
    });
  });

  test("should fetch vehicles based on filter params", () => {
    renderHook(() => useMain());

    expect(useInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["get-tags", Type.TRACKED, ""],
        queryFn: expect.any(Function),
        refetchInterval: 120000,
        staleTime: 119000,
      })
    );
  });

  test("should provide vehicle data from query results", () => {
    const { result } = renderHook(() => useMain());

    expect(result.current.vehicles).toHaveLength(1);
    expect(result.current.vehicles[0].id).toBe("1");
    expect(result.current.locationVehicles).toHaveLength(1);
    expect(result.current.locationVehicles[0].id).toBe("1");
  });

  test("should call fetchNextPage when onScrollEnd is triggered and more pages exist", () => {
    const mockFetchNextPage = jest.fn();
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
      isRefetching: false,
    });

    const { result } = renderHook(() => useMain());

    act(() => {
      result.current.onScrollEnd();
    });

    expect(mockFetchNextPage).toHaveBeenCalled();
  });

  test("should not call fetchNextPage when already fetching or no more pages", () => {
    const mockFetchNextPage = jest.fn();
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isRefetching: false,
    });

    const { result } = renderHook(() => useMain());

    act(() => {
      result.current.onScrollEnd();
    });

    expect(mockFetchNextPage).not.toHaveBeenCalled();

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: true,
      isLoading: false,
      isRefetching: false,
    });

    const { result: result2 } = renderHook(() => useMain());

    act(() => {
      result2.current.onScrollEnd();
    });

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  test("should log refetch information when isRefetching changes to true", () => {
    const { rerender } = renderHook(() => useMain());

    expect(mockConsoleLog).not.toHaveBeenCalled();

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [{ content: { vehicles: [], locationVehicles: [], page: 1, totalPages: 1 } }],
      },
      isRefetching: true,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
    });

    rerender();

    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining("Refetching all vehicle data!"));
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining("Refetching 1 pages of data"));
  });

  test("should filter out undefined vehicles and location vehicles", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            content: {
              vehicles: [{ id: "1" }, undefined, { id: "2" }],
              locationVehicles: [{ id: "A" }, undefined, { id: "B" }],
              page: 1,
              totalPages: 1,
            },
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isRefetching: false,
    });

    const { result } = renderHook(() => useMain());

    expect(result.current.vehicles).toHaveLength(2);
    expect(result.current.locationVehicles).toHaveLength(2);
  });

  test("should handle empty or missing data gracefully", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: true,
      isRefetching: false,
    });

    const { result } = renderHook(() => useMain());

    expect(result.current.vehicles).toEqual([]);
    expect(result.current.locationVehicles).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });
});
