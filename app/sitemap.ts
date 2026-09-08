import { MetadataRoute } from "next";

const baseUrl = "https://ai-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/projects/ai-agent-deployment",
    "/projects/campus-parttime-miniprogram",
    "/projects/certifications",
    "/about",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
