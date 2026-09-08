import { Skill, Certification } from "@/types";

export const skills: Skill[] = [
  {
    name: "AI / 大模型",
    level: 85,
    items: [
      "Qwen 14B（本地部署，Q4_K_M 量化版）",
      "Ollama / LM Studio",
      "OpenClaw 框架",
      "RAG 检索增强生成",
      "提示词工程",
    ],
  },
  {
    name: "后端开发",
    level: 75,
    items: ["Java", "SpringBoot", "MyBatis", "MySQL", "RESTful API"],
  },
  {
    name: "前端开发",
    level: 70,
    items: ["微信小程序", "JavaScript", "HTML/CSS", "TypeScript", "React"],
  },
  {
    name: "AI 工具",
    level: 80,
    items: ["Cursor", "Claude", "GitHub Copilot", "Vibecoding"],
  },
  {
    name: "云平台",
    level: 70,
    items: ["华为云 ModelArts", "HCIA-AI 认证", "HarmonyOS"],
  },
  {
    name: "开发工具",
    level: 75,
    items: ["Git", "VS Code", "Docker", "Linux"],
  },
];

export const certifications: Certification[] = [
  {
    name: "HCIA-AI",
    issuer: "华为",
    date: "2026.08",
    description: "华为认证 AI 工程师",
  },
  {
    name: "AI Agent 技术与应用微认证",
    issuer: "华为云",
    date: "2026.08",
    description: "AI Agent 开发与应用",
  },
  {
    name: "华为人工智能技术链与实践微认证",
    issuer: "华为云",
    date: "2026.08",
    description: "AI 技术链全面学习",
  },
  {
    name: "基于 DeepSeek 和 RAG 构建智能小助手微认证",
    issuer: "华为云",
    date: "2026.08",
    description: "RAG 技术实践",
  },
  {
    name: "HarmonyOS 应用开发者高级认证",
    issuer: "华为",
    date: "2026.04",
    description: "鸿蒙应用开发",
  },
];
