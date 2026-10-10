import { ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/content";

export default async function ProjectsGrid() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((project) => project.featured);
  const compactProjects = projects.filter((project) => !project.featured);

  return (
    <div className="space-y-10">
      {featuredProjects.length > 0 && (
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className={`grid gap-6 overflow-hidden rounded-2xl border border-white/10 transition-transform duration-300 hover:scale-[1.01] md:grid-cols-2 ${
                index % 2 ? "bg-white/[0.03]" : "bg-white/[0.06]"
              }`}
            >
              <div className={`flex h-full flex-col justify-between p-6 md:p-8 ${index % 2 ? "order-2 md:order-1" : ""}`}>
                <div>
                  <div className="text-sm font-semibold text-neutral-300">{project.role || "Project"}</div>
                  <h3 className="mt-1 text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-neutral-300 clamp-3">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-neutral-300">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                {(project.demo || project.github) && (
                  <div className="mt-5 flex flex-wrap gap-4">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm hover:opacity-90">
                        <ExternalLink size={16} /> View
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm hover:opacity-90">
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className={`${index % 2 ? "order-1 md:order-2" : ""} relative h-[220px] md:h-full`}>
                <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </article>
          ))}
        </div>
      )}

      {compactProjects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-neutral-200">Additional work</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {compactProjects.map((project, index) => (
              <details key={`${project.title}-${index}`} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">{project.title}</div>
                      {project.role && <div className="mt-1 text-xs text-neutral-400">{project.role}</div>}
                    </div>
                    <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-neutral-300">
                      View more
                    </span>
                  </div>
                </summary>

                <div className="mt-4 space-y-3">
                  <p className="text-sm text-neutral-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-neutral-300">
                        {technology}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="hover:opacity-90">Demo</a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="hover:opacity-90">GitHub</a>
                    )}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
