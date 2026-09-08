"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/types";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {project.period}
          </span>
          {project.hasDemo && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              可体验 Demo
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          {project.title}
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            查看源码
          </a>
        )}
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          项目背景
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.problem}
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          解决方案
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.solution}
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          技术亮点
        </h2>
        <ul className="space-y-3">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
              <span className="text-zinc-600 dark:text-zinc-400">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          项目成果
        </h2>
        <ul className="space-y-3">
          {project.results.map((result, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-zinc-600 dark:text-zinc-400">{result}</span>
            </li>
          ))}
        </ul>
      </motion.section>
    </div>
  );
}
