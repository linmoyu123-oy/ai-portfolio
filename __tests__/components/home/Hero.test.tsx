import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/home/Hero";

describe("Hero", () => {
  it("renders without crashing", () => {
    render(<Hero />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("displays main heading", () => {
    render(<Hero />);
    expect(screen.getByText("从模型部署到智能应用")).toBeInTheDocument();
  });

  it("displays subtitle", () => {
    render(<Hero />);
    expect(screen.getByText("AI 全链路实践者")).toBeInTheDocument();
  });

  it("displays description", () => {
    render(<Hero />);
    expect(
      screen.getByText(/本地部署 Qwen 14B，搭建 AI Agent/)
    ).toBeInTheDocument();
  });

  it("displays all tags", () => {
    render(<Hero />);
    expect(screen.getByText("AI Agent")).toBeInTheDocument();
    expect(screen.getByText("大模型部署")).toBeInTheDocument();
    expect(screen.getByText("全栈开发")).toBeInTheDocument();
    expect(screen.getByText("Vibecoding")).toBeInTheDocument();
  });

  it("has CTA button linking to projects", () => {
    render(<Hero />);
    const ctaButton = screen.getByText("探索我的项目").closest("a");
    expect(ctaButton).toHaveAttribute("href", "/projects");
  });

  it("CTA button has arrow icon", () => {
    render(<Hero />);
    const ctaButton = screen.getByText("探索我的项目").closest("a");
    expect(ctaButton?.querySelector("svg")).toBeInTheDocument();
  });

  it("tags have correct styling", () => {
    render(<Hero />);
    const tag = screen.getByText("AI Agent");
    expect(tag).toHaveClass("px-4", "py-2", "rounded-full");
  });
});
