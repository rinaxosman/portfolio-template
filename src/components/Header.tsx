import { FileText } from "lucide-react";
import { ACCENT } from "@/lib/constants";
import { siteConfig } from "@/config/site";
import type { CSSProperties } from "react";

const accentStyle: CSSProperties & Record<"--accent", string> = {
  "--accent": ACCENT,
};

export default function Header() {
  const items = siteConfig.nav;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <a href="#home" className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: ACCENT }} />
          <span>{siteConfig.name}</span>
          <span className="text-neutral-400">/ {siteConfig.title}</span>
        </a>

        <nav className="ml-auto hidden items-center gap-6 text-sm md:flex" style={accentStyle}>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
            >
              {item.label}
            </a>
          ))}

          {siteConfig.resume.visible && (
            <a
              href={siteConfig.resume.pdfPath}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:border-[var(--accent)] focus-visible:text-[var(--accent)]"
            >
              <FileText size={16} />
              CV
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
