import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import type { Project } from "@/types";

const mockProject: Project = {
  slug: "test-project",
  title: "测试项目",
  subtitle: "这是一个测试项目",
  tags: ["React", "Next.js"],
  period: "2026.01 - 2026.06",
  description: "测试项目描述",
  problem: "测试问题描述",
  solution: "测试方案描述",
  highlights: ["亮点1", "亮点2"],
  results: ["成果1", "成果2"],
  hasDemo: true,
  github: "https://github.com/test",
};

describe("ProjectDetail", () => {
  it("renders without crashing", () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText("测试项目")).toBeInTheDocument();
  });

  it("displays project title", () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText("测试项目")).toBeInTheDocument();
  });

  it("displays project subtitle", () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText("这是一个测试项目")).toBeInTheDocument();
  });

  it("displays project period", () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText("2026.01 - 2026.06")).toBeInTheDocument();
  });

  it("displays all tags", () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("displays problem section", () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText("项目背景")).toBeInTheDocument();
    expect(screen.getByText("测试问题描述")).toBeInTheDocument();
  });

  it("displays solution section", () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText("解决方案")).toBeInTheDocument();
    expect(screen.getByText("测试方案描述")).toBeInTheDocument();
  });

  it("displays highlights section", () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText("技术亮点")).toBeInTheDocument();
    expect(screen.getByText("亮点1")).toBeInTheDocument();
    expect(screen.getByText("亮点2")).toBeInTheDocument();
  });

  it("displays results section", () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText("项目成果")).toBeInTheDocument();
    expect(screen.getByText("成果1")).toBeInTheDocument();
    expect(screen.getByText("成果2")).toBeInTheDocument();
  });

  it("displays github link when provided", () => {
    render(<ProjectDetail project={mockProject} />);
    const githubLink = screen.getByText("查看源码").closest("a");
    expect(githubLink).toHaveAttribute("href", "https://github.com/test");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("does not display github link when not provided", () => {
    const projectWithoutGithub = { ...mockProject, github: "" };
    render(<ProjectDetail project={projectWithoutGithub} />);
    expect(screen.queryByText("查看源码")).not.toBeInTheDocument();
  });

  it("displays demo badge when hasDemo is true", () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText("可体验 Demo")).toBeInTheDocument();
  });
});
