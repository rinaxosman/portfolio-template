"use client";

import { useState } from "react";
import { Code2, ChevronDown } from "lucide-react";
import { ACCENT } from "@/lib/constants";
import { siteConfig } from "@/config/site";

const snapshot = [...siteConfig.about.tech.featured] as string[];
const categories = Object.entries(siteConfig.about.tech.categories) as Array<[string, readonly string[]]>;
const allSkills = Array.from(new Set(categories.flatMap(([, items]) => [...items])));
const remaining = allSkills.filter((skill) => !snapshot.includes(skill)).length;

export default function About() {
  const [stackOpen, setStackOpen] = useState(false);

  return (
    <div className="grid items-start gap-8 md:grid-cols-3">
      <div className="min-w-0 space-y-5 text-neutral-300 md:col-span-2">
        {siteConfig.about.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 text-sm font-semibold text-white">Tech stack</div>

          <div className="flex flex-wrap gap-2">
            {snapshot.map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-neutral-300">
                {item}
              </span>
            ))}

            <button
              type="button"
              onClick={() => setStackOpen((value) => !value)}
              aria-expanded={stackOpen}
              aria-controls="full-stack"
              className="group inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-medium transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2"
              style={{
                borderColor: ACCENT,
                color: ACCENT,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08)",
              }}
            >
              <span>{stackOpen ? "Hide full stack" : `Show full stack (+${remaining})`}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${stackOpen ? "rotate-180" : ""}`} aria-hidden />
            </button>
          </div>

          <div
            id="full-stack"
            className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out ${
              stackOpen ? "mt-4 max-h-[1600px] opacity-100" : "mt-0 max-h-0 opacity-0"
            }`}
          >
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {categories.map(([title, items]) => (
                <SkillGroup key={title} title={title} items={items} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        {siteConfig.about.current.visible && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text font-semibold" style={{ color: ACCENT }}>
              {siteConfig.about.current.heading}
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {siteConfig.about.current.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        )}

        {siteConfig.about.outside.visible && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text font-semibold" style={{ color: ACCENT }}>
              {siteConfig.about.outside.heading}
            </div>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              {siteConfig.about.outside.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillGroup({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-white">{title}</div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm">
            <Code2 size={16} className="shrink-0" style={{ color: ACCENT }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

