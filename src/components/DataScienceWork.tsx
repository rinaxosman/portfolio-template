"use client";

import { useState } from "react";
import { ExternalLink, Film, GraduationCap, Pill, LineChart, Route, ChevronDown } from "lucide-react";
import { KAGGLE_NOTEBOOKS, type KaggleItem } from "@/data/kaggle";

type Props = {
  items?: KaggleItem[];
  limit?: number;
  title?: string;
  description?: string;
  seeAllHref?: string;
};

export default function DataScienceWork({
  items,
  limit = 3,
  title = "Data & ML work",
  description = "End-to-end analysis across experimentation, product analytics, and model evaluation for practical decision-making.",
  seeAllHref = "https://example.com",
}: Props) {
  const all = items ?? KAGGLE_NOTEBOOKS;
  const preview = all.slice(0, limit);
  const rest = all.slice(limit);
  const [open, setOpen] = useState(false);

  return (
    <div className="pt-2">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h4 className="text font-semibold text-neutral-300">{title}</h4>
          <p className="mt-1 max-w-2xl text-sm text-neutral-400">{description}</p>
        </div>
        <a
          href={seeAllHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:opacity-90 whitespace-nowrap"
        >
          See all <ExternalLink size={14} />
        </a>
      </div>

      {/* Preview grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {preview.map((n) => <Card key={n.url} item={n} />)}
      </div>

      {/* Collapsible: the rest */}
      {rest.length > 0 && (
        <>
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out ${
              open ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            {rest.map((n) => <Card key={n.url} item={n} />)}
          </div>

          {/* Toggle */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-neutral-300 hover:bg-white/10"
              aria-expanded={open}
              aria-controls="more-ds-work"
            >
              {open ? "View less" : `View more (${rest.length})`}
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Card({ item }: { item: KaggleItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 pb-10 transition-colors hover:bg-white/[0.06]"
      aria-label={item.title}
    >
      <div className="flex items-start gap-3">
        <IconForNotebook title={item.title} />
        <div className="min-w-0">
          <div className="font-semibold leading-snug group-hover:underline">
            {item.title}
          </div>
          {item.note && (
            <div className="mt-1 text-sm text-neutral-400 line-clamp-2">
              {item.note}
            </div>
          )}

          {item.tags?.length ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom-right action */}
      <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-2 text-sm text-neutral-300">
        Open <ExternalLink size={14} className="opacity-80" />
      </span>
    </a>
  );
}

/** Picks a small decorative icon based on the title. */
function IconForNotebook({ title }: { title: string }) {
  const box =
    "mt-0.5 h-10 w-10 shrink-0 rounded-lg ring-1 ring-white/10 flex items-center justify-center";

  if (/movie|movies/i.test(title)) {
    return (
      <div className={`${box} bg-gradient-to-br from-indigo-400/15 to-fuchsia-400/10`}>
        <Film className="h-5 w-5 opacity-80" />
      </div>
    );
  }

  if (/(university|universities|school|college)/i.test(title)) {
    return (
      <div className={`${box} bg-gradient-to-br from-cyan-300/20 to-blue-400/15`}>
        <GraduationCap className="h-5 w-5 opacity-80" />
      </div>
    );
  }

  if (/german|credit/i.test(title)) {
    // tiny flag for German Credit stays nice and distinctive
    return (
      <div className={`${box} overflow-hidden p-[2px] bg-white/5`}>
        <div className="h-full w-full rounded-[4px] overflow-hidden">
          <div className="h-1/3 w-full bg-black/90" />
          <div className="h-1/3 w-full bg-red-600/90" />
          <div className="h-1/3 w-full bg-yellow-400/90" />
        </div>
      </div>
    );
  }

  if (/drug/i.test(title)) {
    return (
      <div className={`${box} bg-gradient-to-br from-rose-400/15 to-pink-400/10`}>
        <Pill className="h-5 w-5 opacity-80" />
      </div>
    );
  }

  if (/regression|linear/i.test(title)) {
    return (
      <div className={`${box} bg-gradient-to-br from-emerald-400/15 to-teal-400/10`}>
        <LineChart className="h-5 w-5 opacity-80" />
      </div>
    );
  }

  if (/heuristic|tsp|berlin/i.test(title)) {
    return (
      <div className={`${box} bg-gradient-to-br from-amber-400/15 to-orange-400/10`}>
        <Route className="h-5 w-5 opacity-80" />
      </div>
    );
  }

  // fallback
  return <div className={`${box} bg-white/5`} />;
}