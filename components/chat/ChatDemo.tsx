"use client";

import dynamic from "next/dynamic";

const ChatWindow = dynamic(
  () =>
    import("@/components/chat/ChatWindow").then((mod) => mod.ChatWindow),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[400px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="text-zinc-400 dark:text-zinc-500 text-sm">
          加载中...
        </div>
      </div>
    ),
  }
);

interface ChatDemoProps {
  systemPrompt: string;
}

export function ChatDemo({ systemPrompt }: ChatDemoProps) {
  return <ChatWindow systemPrompt={systemPrompt} />;
}
