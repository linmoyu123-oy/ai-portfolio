import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("bg-zinc-900", "dark:bg-zinc-100");
  });

  it("applies secondary variant styles", () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("border", "border-zinc-200");
  });

  it("applies ghost variant styles", () => {
    render(<Button variant="ghost">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("text-zinc-600", "dark:text-zinc-400");
  });

  it("applies small size styles", () => {
    render(<Button size="sm">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("px-3", "py-1.5", "text-xs");
  });

  it("applies medium size styles", () => {
    render(<Button size="md">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("px-4", "py-2", "text-sm");
  });

  it("applies large size styles", () => {
    render(<Button size="lg">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("px-6", "py-3", "text-base");
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByText("Click me")).toHaveClass("custom-class");
  });
});
