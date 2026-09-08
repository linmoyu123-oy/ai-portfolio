import { Metadata } from "next";
import projects from "@/content/projects.json";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types";

export const metadata: Metadata = {
  title: "项目展示 | 王世达",
  description: "AI 应用开发项目案例展示",
};

export default function ProjectsPage() {
  const projectList = projects as Project[];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            项目展示
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            从模型部署到智能应用，AI 全链路实践
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectList.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
