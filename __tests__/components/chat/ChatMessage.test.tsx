import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ChatMessage } from "@/components/chat/ChatMessage";

describe("ChatMessage", () => {
  it("renders user message correctly", () => {
    render(<ChatMessage role="user" content="Hello" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders assistant message correctly", () => {
    render(<ChatMessage role="assistant" content="Hi there!" />);
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });

  it("applies correct styling for user message", () => {
    render(<ChatMessage role="user" content="Test" />);
    const message = screen.getByText("Test").closest("div");
    expect(message).toHaveClass("bg-zinc-900", "dark:bg-zinc-100");
  });

  it("applies correct styling for assistant message", () => {
    render(<ChatMessage role="assistant" content="Test" />);
    const message = screen.getByText("Test").closest("div");
    expect(message).toHaveClass("bg-zinc-100", "dark:bg-zinc-800");
  });

  it("displays user icon for user messages", () => {
    render(<ChatMessage role="user" content="Test" />);
    const icons = document.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("displays bot icon for assistant messages", () => {
    render(<ChatMessage role="assistant" content="Test" />);
    const icons = document.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("preserves whitespace in content", () => {
    const content = "Line 1\nLine 2";
    render(<ChatMessage role="user" content={content} />);
    const paragraph = screen.getByText((contentElement) =>
      contentElement.includes("Line 1") && contentElement.includes("Line 2")
    );
    expect(paragraph).toBeInTheDocument();
  });
});
