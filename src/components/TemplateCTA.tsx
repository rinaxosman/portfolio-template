"use client";

import { useState } from "react";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ACCENT } from "@/lib/constants";

export default function TemplateCTA() {
  const [open, setOpen] = useState(false);
  const stack = siteConfig.template.stack;
  const preview = stack.slice(0, 3);
  const remaining = Math.max(0, stack.length - preview.length);

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
        <h3 className="text-xl font-semibold">Use this template</h3>
        <p className="mt-2 text-neutral-300">{siteConfig.template.description}</p>

        <div className="mt-4 flex flex-wrap gap-3">
          {siteConfig.template.repoUrl && (
            <a
              href={siteConfig.template.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium text-neutral-950"
              style={{ backgroundColor: ACCENT }}
            >
              <Github size={18} /> View repo
            </a>
          )}

          {siteConfig.template.docsUrl && (
            <a
              href={siteConfig.template.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 hover:bg-white/5"
            >
              Docs <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen((value) => !value);
            }
          }}
          aria-expanded={open}
          aria-controls="stack-chips"
          className="flex w-full items-start justify-between gap-4 p-6 text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 md:p-7"
        >
          <div className="min-w-0">
            <div className="font-medium text-neutral-200">This site’s stack</div>
            <div
              id="stack-chips"
              className={`mt-2 overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "max-h-48 md:max-h-64" : "max-h-8"
              }`}
            >
              <div className="flex flex-wrap gap-2">
                {(open ? stack : preview).map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}

                {!open && remaining > 0 && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpen(true);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        setOpen(true);
                      }
                    }}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-neutral-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    aria-label={`Show ${remaining} more stack items`}
                    title="Show full stack"
                  >
                    + {remaining} more
                    <ChevronDown className="h-3 w-3 opacity-80" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-sm text-neutral-300">
            <span className="hidden sm:inline">{open ? "Hide stack" : "Show stack"}</span>
            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-neutral-300">{children}</span>;
}
