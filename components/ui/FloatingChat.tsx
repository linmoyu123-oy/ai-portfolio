"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "你好！我是AI助手，可以回答关于我的技能、项目和经验的问题。有什么想了解的吗？",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `你是一个AI助手，用于介绍简历主人的信息。请根据以下信息回答问题：
姓名：王世达
求职意向：AI产品经理、AI运营等非技术岗位

技能：
- AI Agent开发（OpenClaw框架、工具调用、定时任务）
- 大模型本地部署（Qwen 14B Q4_K_M量化、Ollama、LM Studio）
- 全栈开发（Java SpringBoot、微信小程序、Node.js、MySQL）
- Vibecoding（AI辅助编程、快速产品化迭代）

项目：
1. 大模型与AI Agent部署实践（2026.03-2026.06）：本地部署Qwen 14B量化版，通过Ollama/LM Studio完成模型加载与API接入，基于OpenClaw框架搭建AI助手，接入QQ机器人实现多轮对话、定时任务调度与脚本调用。完成4个开源模型的性能测试。
2. 校园兼职小程序（2025.09-2025.12）：微信小程序原生前端 + Java SpringBoot + MySQL后端，实现JWT鉴权、岗位发布与分页检索、接单申请、文件上传、全局异常处理，开源在GitHub。
3. 华为AI认证体系（2026.04-2026.08）：获得5项华为AI相关认证，包括HCIA-AI华为认证AI工程师、AI Agent技术与应用微认证、基于DeepSeek和RAG构建智能小助手微认证、HarmonyOS应用开发者高级认证。系统掌握大模型、Agent、RAG等核心技术，具备华为云ModelArts平台实操能力。

经验：具备从模型部署到智能应用落地的全链路实操能力
请用简洁友好的语气回答，突出专业能力。`,
            },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage },
          ],
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `请求失败 (${response.status})`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("无法获取响应流");
      }

      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.choices?.[0]?.delta?.content) {
                assistantMessage += parsed.choices[0].delta.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantMessage,
                  };
                  return updated;
                });
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "未知错误";
      setError(errorMessage);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: "抱歉，出现了错误，请稍后再试。",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "关闭聊天" : "打开聊天"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 z-50 flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Bot className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  AI 助手
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  问我关于王世达的问题
                </p>
              </div>
            </div>

            {error && (
              <div className="px-4 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    }`}
                  >
                    {msg.content || (
                      <span className="inline-block w-2 h-4 bg-zinc-400 animate-pulse" />
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-white dark:text-zinc-900" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入问题..."
                  className="flex-1 px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
