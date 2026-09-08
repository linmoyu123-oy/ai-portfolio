import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChatInput } from "@/components/chat/ChatInput";

describe("ChatInput", () => {
  it("renders without crashing", () => {
    render(<ChatInput onSend={() => {}} />);
    expect(
      screen.getByPlaceholderText("输入消息...")
    ).toBeInTheDocument();
  });

  it("calls onSend when form is submitted", () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);

    const input = screen.getByPlaceholderText("输入消息...");
    fireEvent.change(input, { target: { value: "Hello" } });
    
    const form = input.closest("form")!;
    fireEvent.submit(form);

    expect(onSend).toHaveBeenCalledWith("Hello");
  });

  it("does not call onSend when input is empty", () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);

    const form = screen.getByPlaceholderText("输入消息...").closest("form")!;
    fireEvent.submit(form);

    expect(onSend).not.toHaveBeenCalled();
  });

  it("clears input after sending", () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);

    const input = screen.getByPlaceholderText("输入消息...");
    fireEvent.change(input, { target: { value: "Hello" } });
    
    const form = input.closest("form")!;
    fireEvent.submit(form);

    expect(input).toHaveValue("");
  });

  it("disables input when disabled prop is true", () => {
    render(<ChatInput onSend={() => {}} disabled />);
    const input = screen.getByPlaceholderText("输入消息...");
    expect(input).toBeDisabled();
  });

  it("disables send button when input is empty", () => {
    render(<ChatInput onSend={() => {}} />);
    const sendButton = screen.getByRole("button");
    expect(sendButton).toBeDisabled();
  });

  it("enables send button when input has content", () => {
    render(<ChatInput onSend={() => {}} />);
    const input = screen.getByPlaceholderText("输入消息...");
    fireEvent.change(input, { target: { value: "Hello" } });
    const sendButton = screen.getByRole("button");
    expect(sendButton).not.toBeDisabled();
  });
});
