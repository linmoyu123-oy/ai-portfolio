import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("next/font/google", () => ({
  Geist: () => ({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  }),
  Geist_Mono: () => ({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders without crashing", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("displays logo text", () => {
    render(<Header />);
    expect(screen.getByText("王世达")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByText("首页")).toBeInTheDocument();
    expect(screen.getByText("项目")).toBeInTheDocument();
    expect(screen.getByText("关于")).toBeInTheDocument();
  });

  it("has theme toggle button", () => {
    render(<Header />);
    const buttons = screen.getAllByLabelText(/Current theme/);
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("has mobile menu button", () => {
    render(<Header />);
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("logo links to home page", () => {
    render(<Header />);
    const logo = screen.getByText("王世达").closest("a");
    expect(logo).toHaveAttribute("href", "/");
  });

  it("navigation links have correct hrefs", () => {
    render(<Header />);
    const homeLink = screen.getByText("首页").closest("a");
    const projectsLink = screen.getByText("项目").closest("a");
    const aboutLink = screen.getByText("关于").closest("a");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(projectsLink).toHaveAttribute("href", "/projects");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });
});
