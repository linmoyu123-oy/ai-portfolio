import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import projects from "@/content/projects.json";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { ChatDemo } from "@/components/chat/ChatDemo";
import type { Project } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return (projects as Project[]).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = (projects as Project[]).find((p) => p.slug === slug) as Project | undefined;

  if (!project) {
    return { title: "项目未找到" };
  }

  return {
    title: `${project.title} | 王世达`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug) as Project | undefined;

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          返回项目列表
        </Link>

        <ProjectDetail project={project} />

        {project.hasDemo && project.demoPrompt && (
          <div className="mt-12 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              体验 Demo
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              与 AI 助手对话，了解这个项目的细节
            </p>
            <ChatDemo systemPrompt={project.demoPrompt} />
          </div>
        )}
      </div>
    </div>
  );
}
