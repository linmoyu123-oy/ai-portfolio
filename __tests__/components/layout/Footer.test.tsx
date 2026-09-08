import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("displays copyright notice", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
  });

  it("has GitHub link", () => {
    render(<Footer />);
    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/linmoyu123-oy"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has email link", () => {
    render(<Footer />);
    const emailLink = screen.getByLabelText("Email");
    expect(emailLink).toHaveAttribute("href", "mailto:linmoyu501@gmail.com");
  });

  it("has phone link", () => {
    render(<Footer />);
    const phoneLink = screen.getByLabelText("Phone");
    expect(phoneLink).toHaveAttribute("href", "tel:198-3251-8858");
  });

  it("external links have proper security attributes", () => {
    render(<Footer />);
    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
