import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

describe("ScrollReveal", () => {
  it("renders children correctly", () => {
    render(
      <ScrollReveal>
        <div>Test content</div>
      </ScrollReveal>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <ScrollReveal className="custom-class">
        <div>Test content</div>
      </ScrollReveal>
    );
    const wrapper = screen.getByText("Test content").parentElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders with different directions", () => {
    const { rerender } = render(
      <ScrollReveal direction="up">
        <div>Test</div>
      </ScrollReveal>
    );
    expect(screen.getByText("Test")).toBeInTheDocument();

    rerender(
      <ScrollReveal direction="left">
        <div>Test</div>
      </ScrollReveal>
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders with custom delay", () => {
    render(
      <ScrollReveal delay={0.5}>
        <div>Test content</div>
      </ScrollReveal>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });
});
