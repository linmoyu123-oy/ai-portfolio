import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CartoonBoy } from "@/components/ui/CartoonBoy";

describe("CartoonBoy", () => {
  it("renders without crashing", () => {
    render(<CartoonBoy />);
    expect(screen.getByText("移动鼠标或点击我")).toBeInTheDocument();
  });

  it("shows hint text initially", () => {
    render(<CartoonBoy />);
    expect(screen.getByText("移动鼠标或点击我")).toBeInTheDocument();
  });

  it("shows click hint when clicked", async () => {
    render(<CartoonBoy />);
    const container = screen.getByText("移动鼠标或点击我").closest("div")!;
    const clickableDiv = container.querySelector("div[class*='cursor-pointer']")!;
    
    await act(async () => {
      fireEvent.click(clickableDiv);
    });

    expect(screen.getByText("👆 点上面的按钮")).toBeInTheDocument();
  });

  it("shows about me button when clicked", async () => {
    render(<CartoonBoy />);
    const container = screen.getByText("移动鼠标或点击我").closest("div")!;
    const clickableDiv = container.querySelector("div[class*='cursor-pointer']")!;
    
    await act(async () => {
      fireEvent.click(clickableDiv);
    });

    const aboutButton = screen.getByText("关于我 →");
    expect(aboutButton).toBeInTheDocument();
    expect(aboutButton.closest("a")).toHaveAttribute("href", "/about");
  });

  it("hides click hint after 3 seconds", async () => {
    jest.useFakeTimers();
    render(<CartoonBoy />);
    const container = screen.getByText("移动鼠标或点击我").closest("div")!;
    const clickableDiv = container.querySelector("div[class*='cursor-pointer']")!;
    
    await act(async () => {
      fireEvent.click(clickableDiv);
    });

    expect(screen.getByText("👆 点上面的按钮")).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText("👆 点上面的按钮")).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("responds to mouse movement", async () => {
    render(<CartoonBoy />);
    const container = screen.getByText("移动鼠标或点击我").closest("div")!;
    
    expect(container).toBeInTheDocument();

    await act(async () => {
      fireEvent.mouseMove(container, {
        clientX: 100,
        clientY: 100,
      });
    });

    // The component should still be rendered
    expect(screen.getByText("移动鼠标或点击我")).toBeInTheDocument();
  });
});
