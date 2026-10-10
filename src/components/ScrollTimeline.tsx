"use client";

import { useEffect, useState } from "react";
import { ACCENT } from "@/lib/constants";

type Section = { id: string; label: string };

export default function ScrollTimeline({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const handler = () => {
      // Anchor line a bit below the top (adjust if your header height changes)
      const anchorY = Math.max(0, window.innerHeight * 0.28);

      // Pick the last section whose top is above the anchor line
      let current = sections[0]?.id ?? "";
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - anchorY <= 0) current = id;
      }

      // If we’re basically at the bottom, force the last one
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (nearBottom && sections.length) current = sections[sections.length - 1].id;

      setActiveId(current);
    };

    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    // initialize once
    handler();

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [sections]);

  const activeIdx = Math.max(0, sections.findIndex((s) => s.id === activeId));

  return (
    <nav
        aria-label="Page sections"
        className="hidden min-[1470px]:flex fixed left-12 top-32 z-40 flex-col items-center select-none"
        >

      {sections.map((s, i) => {
        const passed = i < activeIdx;
        const active = i === activeIdx;
        return (
          <div key={s.id} className="flex flex-col items-center">
            <a href={`#${s.id}`} className="group relative">
              <span
                className={`block h-4 w-4 rounded-full transition-all duration-200 ${
                  passed || active ? "" : "bg-white/25"
                }`}
                style={
                  passed || active
                    ? { backgroundColor: ACCENT, boxShadow: `0 0 12px ${ACCENT}88` }
                    : undefined
                }
              />
              <span
                className={`pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 text-sm transition-opacity ${
                  active ? "opacity-100 text-white" : "opacity-0 group-hover:opacity-100 text-neutral-400"
                }`}
              >
                {s.label}
              </span>
            </a>

            {i < sections.length - 1 && (
              <div
                className={`w-[2px] h-12 transition-colors ${passed ? "" : "bg-white/15"}`}
                style={passed ? { backgroundColor: ACCENT } : undefined}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
