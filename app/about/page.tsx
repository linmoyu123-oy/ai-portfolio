import { Metadata } from "next";
import { Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { skills, certifications } from "@/content/skills";
import { SkillMatrix } from "@/components/skills/SkillMatrix";
import { CertBadge } from "@/components/skills/CertBadge";

export const metadata: Metadata = {
  title: "关于我 | 王世达",
  description: "AI 应用开发工程师，从模型部署到智能应用的全链路实践者",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            关于我
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            从模型部署到智能应用，AI 全链路实践者
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-gray-800">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                  王世达
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
                  AI 应用开发工程师，专注大模型部署与 Agent 开发，具备从模型部署到智能应用落地的全链路实操能力。
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <a
                      href="mailto:linmoyu501@gmail.com"
                      className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      linmoyu501@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <a
                      href="tel:198-3251-8858"
                      className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      198-3251-8858
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>廊坊</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold text-zinc-900 dark:text-white">
                    教育背景
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    燕京理工学院
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    计算机科学与技术 · 本科（2027 届）
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    2025.09 - 2027.07
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                技能矩阵
              </h2>
              <SkillMatrix skills={skills} />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                认证资质
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {certifications.map((cert, index) => (
                  <CertBadge key={cert.name} cert={cert} index={index} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                个人总结
              </h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  本地部署 Qwen 14B 并完成 Agent 工具调用落地，具备微信小程序全栈开发能力（Java SpringBoot + MySQL 后端）；通过 HCIA-AI 及 AI Agent、RAG 等多项华为云认证，能借助 AI 辅助编程（Vibecoding）高效交付项目，具备从模型部署到智能应用落地的全链路实操能力。
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
