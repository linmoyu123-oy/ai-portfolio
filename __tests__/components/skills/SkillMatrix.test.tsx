import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SkillMatrix } from "@/components/skills/SkillMatrix";
import type { Skill } from "@/types";

const mockSkills: Skill[] = [
  {
    name: "AI / 大模型",
    level: 85,
    items: ["Qwen 14B", "Ollama"],
  },
  {
    name: "后端开发",
    level: 75,
    items: ["Java", "SpringBoot"],
  },
];

describe("SkillMatrix", () => {
  it("renders without crashing", () => {
    render(<SkillMatrix skills={mockSkills} />);
    expect(screen.getByText("AI / 大模型")).toBeInTheDocument();
  });

  it("displays all skill names", () => {
    render(<SkillMatrix skills={mockSkills} />);
    expect(screen.getByText("AI / 大模型")).toBeInTheDocument();
    expect(screen.getByText("后端开发")).toBeInTheDocument();
  });

  it("displays skill levels", () => {
    render(<SkillMatrix skills={mockSkills} />);
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("displays all skill items", () => {
    render(<SkillMatrix skills={mockSkills} />);
    expect(screen.getByText("Qwen 14B")).toBeInTheDocument();
    expect(screen.getByText("Ollama")).toBeInTheDocument();
    expect(screen.getByText("Java")).toBeInTheDocument();
    expect(screen.getByText("SpringBoot")).toBeInTheDocument();
  });

  it("renders empty when no skills provided", () => {
    render(<SkillMatrix skills={[]} />);
    expect(screen.queryByText("AI / 大模型")).not.toBeInTheDocument();
  });

  it("renders correct number of skill cards", () => {
    render(<SkillMatrix skills={mockSkills} />);
    const cards = screen.getAllByText(/%/);
    expect(cards).toHaveLength(2);
  });
});
