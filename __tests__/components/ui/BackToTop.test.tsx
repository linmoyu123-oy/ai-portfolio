import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BackToTop } from "@/components/ui/BackToTop";

describe("BackToTop", () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("renders without crashing", () => {
    render(<BackToTop />);
    expect(screen.queryByLabelText("返回顶部")).not.toBeInTheDocument();
  });

  it("shows button when scrolled down", async () => {
    render(<BackToTop />);
    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 400, writable: true });
      fireEvent.scroll(window);
    });
    expect(screen.getByLabelText("返回顶部")).toBeInTheDocument();
  });

  it("hides button when scrolled up", async () => {
    render(<BackToTop />);
    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 400, writable: true });
      fireEvent.scroll(window);
    });
    expect(screen.getByLabelText("返回顶部")).toBeInTheDocument();

    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 100, writable: true });
      fireEvent.scroll(window);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    expect(screen.queryByLabelText("返回顶部")).not.toBeInTheDocument();
  });

  it("calls scrollTo when clicked", async () => {
    render(<BackToTop />);
    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 400, writable: true });
      fireEvent.scroll(window);
    });

    fireEvent.click(screen.getByLabelText("返回顶部"));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
