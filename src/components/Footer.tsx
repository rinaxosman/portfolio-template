import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-10 text-sm text-neutral-400">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span className="opacity-50">·</span>
        <span>{siteConfig.email}</span>
        <span className="opacity-50">·</span>
        <span className="flex items-center gap-1">
          {siteConfig.footer.showBackToTop && (
            <a href="#home" className="hover:opacity-80">
              Back to top
            </a>
          )}
        </span>
      </div>
    </footer>
  );
}
