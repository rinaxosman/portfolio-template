import { promises as fs } from "node:fs";
import path from "node:path";

import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
} from "@/config/site";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function parseScalar(value: string): string | number | boolean | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

  return trimmed;
}

function parseFrontmatter(raw: string) {
  const normalized = raw.replace(/^\uFEFF/, "");
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, body: normalized.trim() };
  }

  const [, frontmatter, body] = match;
  const lines = frontmatter.split(/\r?\n/);
  const data: Record<string, unknown> = {};
  let currentKey: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const listMatch = trimmed.match(/^-(?:\s+)?(.+)$/);
    if (listMatch) {
      if (!currentKey) continue;
      const currentValue = data[currentKey];
      const item = parseScalar(listMatch[1]);
      if (Array.isArray(currentValue)) {
        currentValue.push(item);
      } else {
        data[currentKey] = [item];
      }
      continue;
    }

    const keyValueMatch = trimmed.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyValueMatch) {
      continue;
    }

    const [, key, value] = keyValueMatch;
    if (value === "") {
      currentKey = key;
      data[key] = [];
      continue;
    }

    currentKey = null;
    data[key] = parseScalar(value);
  }

  return { data, body: body.trim() };
}

function normalizeString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => (typeof entry === "string" ? entry.trim() : String(entry).trim()))
    .filter(Boolean);
}

async function readMarkdownFiles<T>(folderName: string): Promise<T[]> {
  const folderPath = path.join(CONTENT_ROOT, folderName);

  try {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });
    const fileNames = entries
      .filter((entry) => entry.isFile() && /\.mdx?$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort();

    const results = await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(folderPath, fileName);
        const content = await fs.readFile(fullPath, "utf8");
        const { data } = parseFrontmatter(content);
        return data as T;
      }),
    );

    return results.filter((item) => item && typeof item === "object");
  } catch {
    return [];
  }
}

export async function getProjects(): Promise<ProjectItem[]> {
  const items = await readMarkdownFiles<ProjectItem>("projects");

  return items
    .map((item) => ({
      title: normalizeString(item.title, "Project Title"),
      role: normalizeString(item.role, "Role or Team"),
      description: normalizeString(item.description, "Describe what you built and the technologies used."),
      technologies: normalizeStringArray(item.technologies),
      image: normalizeString(item.image, "/images/project-placeholder.svg"),
      github: typeof item.github === "string" && item.github.trim() ? item.github.trim() : undefined,
      demo: typeof item.demo === "string" && item.demo.trim() ? item.demo.trim() : undefined,
      featured: Boolean(item.featured),
    }))
    .filter((item) => item.title !== "Project Title" || item.description !== "Describe what you built and the technologies used." || item.role !== "Role or Team" || item.technologies.length > 0);
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const items = await readMarkdownFiles<ExperienceItem>("experience");

  return items
    .map((item) => ({
      title: normalizeString(item.title, "Software Developer"),
      organization: normalizeString(item.organization, "Company Name"),
      date: normalizeString(item.date, "Jan 2024 – Present"),
      description: normalizeString(item.description, "Describe your responsibilities, technical contributions, and achievements."),
      technologies: normalizeStringArray(item.technologies),
    }))
    .filter((item) => item.title || item.organization || item.description);
}

export async function getEducation(): Promise<EducationItem[]> {
  const items = await readMarkdownFiles<EducationItem>("education");

  return items
    .map((item) => ({
      title: normalizeString(item.title, "Degree or Program"),
      organization: normalizeString(item.organization, "University Name"),
      date: normalizeString(item.date, "Year"),
      description: normalizeString(item.description, "Describe your coursework, focus areas, or achievements."),
    }))
    .filter((item) => item.title || item.organization || item.description);
}
