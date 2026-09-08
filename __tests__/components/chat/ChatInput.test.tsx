import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChatInput } from "@/components/chat/ChatInput";

describe("ChatInput", () => {
  it("renders without crashing", () => {
    render(<ChatInput onSend={() => {}} />);
    expect(
      screen.getByPlaceholderText("输入你的问题...")
    ).toBeInTheDocument();
  });

  it("calls onSend when Enter is pressed", () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);

    const input = screen.getByPlaceholderText("输入你的问题...");
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSend).toHaveBeenCalledWith("Hello");
  });

  it("does not call onSend when Shift+Enter is pressed", () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);

    const input = screen.getByPlaceholderText("输入你的问题...");
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyDown(input, { key: "Enter", shiftKey: true });

    expect(onSend).not.toHaveBeenCalled();
  });

  it("does not call onSend when input is empty", () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);

    const input = screen.getByPlaceholderText("输入你的问题...");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSend).not.toHaveBeenCalled();
  });

  it("clears input after sending", () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);

    const input = screen.getByPlaceholderText("输入你的问题...");
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input).toHaveValue("");
  });

  it("disables input when disabled prop is true", () => {
    render(<ChatInput onSend={() => {}} disabled />);
    const input = screen.getByPlaceholderText("输入你的问题...");
    expect(input).toBeDisabled();
  });

  it("disables send button when input is empty", () => {
    render(<ChatInput onSend={() => {}} />);
    const sendButton = screen.getByRole("button");
    expect(sendButton).toBeDisabled();
  });

  it("enables send button when input has content", () => {
    render(<ChatInput onSend={() => {}} />);
    const input = screen.getByPlaceholderText("输入你的问题...");
    fireEvent.change(input, { target: { value: "Hello" } });
    const sendButton = screen.getByRole("button");
    expect(sendButton).not.toBeDisabled();
  });
});
