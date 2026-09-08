import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders without crashing", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows correct aria-label", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
  });

  it("toggles theme on click", async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    await act(async () => {
      button.click();
    });

    expect(localStorage.getItem("theme")).toBeTruthy();
  });

  it("cycles through themes: light -> dark -> system", async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    // Initial state: component saves "system" on mount
    await act(async () => {});
    expect(localStorage.getItem("theme")).toBe("system");

    // Click: system -> light
    await act(async () => {
      button.click();
    });
    expect(localStorage.getItem("theme")).toBe("light");

    // Click: light -> dark
    await act(async () => {
      button.click();
    });
    expect(localStorage.getItem("theme")).toBe("dark");

    // Click: dark -> system
    await act(async () => {
      button.click();
    });
    expect(localStorage.getItem("theme")).toBe("system");
  });

  it("handles localStorage error gracefully", async () => {
    const mockError = new Error("localStorage error");
    const originalSetItem = localStorageMock.setItem;
    localStorageMock.setItem = jest.fn(() => {
      throw mockError;
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    // Initial mount should handle the error
    await act(async () => {});

    // Click should also handle the error
    await act(async () => {
      button.click();
    });

    // Should not throw, localStorage remains as initial state
    expect(localStorage.getItem("theme")).toBeNull();

    localStorageMock.setItem = originalSetItem;
  });
});
