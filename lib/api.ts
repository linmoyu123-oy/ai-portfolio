const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatCompletionOptions {
  messages: ChatMessage[];
  systemPrompt?: string;
}

export async function createChatCompletion({
  messages,
  systemPrompt,
}: ChatCompletionOptions): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const systemMessage: ChatMessage | null = systemPrompt
    ? { role: "system", content: systemPrompt }
    : null;

  const allMessages = systemMessage
    ? [systemMessage, ...messages]
    : messages;

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://ai-portfolio.vercel.app",
      "X-Title": "AI Portfolio",
    },
    body: JSON.stringify({
      model: "auto",
      messages: allMessages,
      stream: true,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OpenRouter API error: ${response.status} - ${errorText}`
    );
  }

  if (!response.body) {
    throw new Error("No response body");
  }

  return response.body;
}

export function createChatCompletionSync({
  messages,
  systemPrompt,
}: ChatCompletionOptions): Promise<Response> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const systemMessage: ChatMessage | null = systemPrompt
    ? { role: "system", content: systemPrompt }
    : null;

  const allMessages = systemMessage
    ? [systemMessage, ...messages]
    : messages;

  return fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://ai-portfolio.vercel.app",
      "X-Title": "AI Portfolio",
    },
    body: JSON.stringify({
      model: "auto",
      messages: allMessages,
      stream: true,
      max_tokens: 1024,
    }),
  });
}
