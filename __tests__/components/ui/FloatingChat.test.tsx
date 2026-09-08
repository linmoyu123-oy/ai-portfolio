import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { FloatingChat } from "@/components/ui/FloatingChat";

// Mock fetch
global.fetch = jest.fn();

describe("FloatingChat", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders chat button", () => {
    render(<FloatingChat />);
    expect(screen.getByLabelText("打开聊天")).toBeInTheDocument();
  });

  it("opens chat window when button is clicked", async () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByLabelText("打开聊天"));
    expect(screen.getByText("AI 助手")).toBeInTheDocument();
    expect(screen.getByText("问我关于王世达的问题")).toBeInTheDocument();
  });

  it("displays initial greeting message", async () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByLabelText("打开聊天"));
    expect(
      screen.getByText(/你好！我是AI助手，可以回答关于我的技能/)
    ).toBeInTheDocument();
  });

  it("closes chat window when close button is clicked", async () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByLabelText("打开聊天"));
    expect(screen.getByText("AI 助手")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByLabelText("关闭聊天"));
    });

    // Wait for animation to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    expect(screen.queryByText("AI 助手")).not.toBeInTheDocument();
  });

  it("has input field for messages", async () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByLabelText("打开聊天"));
    expect(screen.getByPlaceholderText("输入问题...")).toBeInTheDocument();
  });

  it("has send button", async () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByLabelText("打开聊天"));
    expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
  });

  it("send button is disabled when input is empty", async () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByLabelText("打开聊天"));
    const sendButton = screen.getByRole("button", { name: "" });
    expect(sendButton).toBeDisabled();
  });

  it("send button is enabled when input has text", async () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByLabelText("打开聊天"));
    const input = screen.getByPlaceholderText("输入问题...");
    fireEvent.change(input, { target: { value: "你好" } });
    const sendButton = screen.getByRole("button", { name: "" });
    expect(sendButton).not.toBeDisabled();
  });
});
