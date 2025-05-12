// This file is used to set up the test environment
import "@testing-library/jest-dom";

// Mock for URLSearchParams
class MockURLSearchParams {
  private params: Map<string, string>;

  constructor(init?: string | Record<string, string> | URLSearchParams) {
    this.params = new Map();

    if (init) {
      if (typeof init === "string") {
        // Parse query string
        const pairs = init.split("&");
        for (const pair of pairs) {
          const [key, value] = pair.split("=");
          if (key) this.set(key, value || "");
        }
      } else if (init instanceof URLSearchParams) {
        // Copy from another URLSearchParams
        init.forEach((value, key) => {
          this.set(key, value);
        });
      } else {
        // From object
        for (const [key, value] of Object.entries(init)) {
          this.set(key, value);
        }
      }
    }
  }

  get(key: string): string | null {
    return this.params.has(key) ? this.params.get(key) || "" : null;
  }

  set(key: string, value: string): void {
    this.params.set(key, value);
  }

  has(key: string): boolean {
    return this.params.has(key);
  }

  delete(key: string): void {
    this.params.delete(key);
  }

  toString(): string {
    const parts: string[] = [];
    this.params.forEach((value, key) => {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });
    return parts.join("&");
  }

  forEach(callback: (value: string, key: string) => void): void {
    this.params.forEach((value, key) => callback(value, key));
  }
}

// Mock global URLSearchParams if needed
global.URLSearchParams = MockURLSearchParams as never;

// Mock to handle requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
