"use client";

import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${role === "user" ? "justify-end" : "justify-start"}`}>
      {role === "assistant" && (
        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl ${
          role === "user"
            ? "bg-blue-500 text-white rounded-br-md"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-md"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
      {role === "user" && (
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
        </div>
      )}
    </div>
  );
}
