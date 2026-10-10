import { ArrowRight } from "lucide-react";

export default async function BlogPreview() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-sm bg-white/60" />
        <div className="font-medium">Latest posts</div>
      </div>

      <p className="mt-3 text-sm text-neutral-300">
        Add a Substack or RSS feed in the template config to display your writing here.
      </p>

      <div className="mt-4">
        <span className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
          Configure your feed <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
