"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import type { Certification } from "@/types";

interface CertBadgeProps {
  cert: Certification;
  index: number;
}

export function CertBadge({ cert, index }: CertBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
        <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
          {cert.name}
        </h4>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {cert.issuer} · {cert.date}
        </p>
        {cert.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {cert.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
