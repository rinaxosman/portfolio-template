import { ReactNode } from "react";
import { ACCENT } from "@/lib/constants";

export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="mb-10">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: ACCENT }} />
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        </div>
        {subtitle && <p className="text-neutral-300 mt-2">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
