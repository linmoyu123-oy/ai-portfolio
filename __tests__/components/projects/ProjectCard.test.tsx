import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types";

const mockProject: Project = {
  slug: "test-project",
  title: "测试项目",
  subtitle: "这是一个测试项目",
  tags: ["React", "Next.js"],
  period: "2026.01 - 2026.06",
  description: "测试项目描述",
  problem: "测试问题",
  solution: "测试方案",
  highlights: ["亮点1"],
  results: ["成果1"],
  hasDemo: true,
  github: "https://github.com/test",
};

describe("ProjectCard", () => {
  it("renders without crashing", () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText("测试项目")).toBeInTheDocument();
  });

  it("displays project title", () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText("测试项目")).toBeInTheDocument();
  });

  it("displays project subtitle", () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText("这是一个测试项目")).toBeInTheDocument();
  });

  it("displays project period", () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText("2026.01 - 2026.06")).toBeInTheDocument();
  });

  it("displays all tags", () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("displays demo badge when hasDemo is true", () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText("可体验 Demo")).toBeInTheDocument();
  });

  it("does not display demo badge when hasDemo is false", () => {
    const projectWithoutDemo = { ...mockProject, hasDemo: false };
    render(<ProjectCard project={projectWithoutDemo} index={0} />);
    expect(screen.queryByText("可体验 Demo")).not.toBeInTheDocument();
  });

  it("links to project detail page", () => {
    render(<ProjectCard project={mockProject} index={0} />);
    const link = screen.getByText("测试项目").closest("a");
    expect(link).toHaveAttribute("href", "/projects/test-project");
  });

  it("displays view details text", () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText("查看详情")).toBeInTheDocument();
  });
});
