export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  period: string;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  results: string[];
  hasDemo: boolean;
  demoPrompt?: string;
  github?: string;
}

export interface Skill {
  name: string;
  level: number;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export type Theme = "light" | "dark" | "system";
