"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/types";

interface SkillMatrixProps {
  skills: Skill[];
}

export function SkillMatrix({ skills }: SkillMatrixProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
              {skill.name}
            </h3>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {skill.level}%
            </span>
          </div>

          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {skill.items.map((item) => (
              <span
                key={item}
                className="px-2 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
