import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CertBadge } from "@/components/skills/CertBadge";
import type { Certification } from "@/types";

const mockCert: Certification = {
  name: "HCIA-AI",
  issuer: "华为",
  date: "2026.08",
  description: "华为认证 AI 工程师",
};

describe("CertBadge", () => {
  it("renders without crashing", () => {
    render(<CertBadge cert={mockCert} index={0} />);
    expect(screen.getByText("HCIA-AI")).toBeInTheDocument();
  });

  it("displays certification name", () => {
    render(<CertBadge cert={mockCert} index={0} />);
    expect(screen.getByText("HCIA-AI")).toBeInTheDocument();
  });

  it("displays issuer and date", () => {
    render(<CertBadge cert={mockCert} index={0} />);
    expect(screen.getByText("华为 · 2026.08")).toBeInTheDocument();
  });

  it("displays description when provided", () => {
    render(<CertBadge cert={mockCert} index={0} />);
    expect(screen.getByText("华为认证 AI 工程师")).toBeInTheDocument();
  });

  it("does not display description when not provided", () => {
    const certWithoutDesc = { ...mockCert, description: undefined };
    render(<CertBadge cert={certWithoutDesc} index={0} />);
    expect(screen.queryByText("华为认证 AI 工程师")).not.toBeInTheDocument();
  });

  it("displays award icon", () => {
    render(<CertBadge cert={mockCert} index={0} />);
    const icons = document.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });
});
