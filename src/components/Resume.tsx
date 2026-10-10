import {
  BarChart3,
  Code2,
  FileText,
  GraduationCap,
  HandHeart,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getEducation, getExperience } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  default: Code2,
  code: Code2,
  chart: BarChart3,
  phone: Smartphone,
  heart: HandHeart,
  education: GraduationCap,
};

export async function Resume() {
  const experience = await getExperience();
  const education = await getEducation();

  return (
    <div className="space-y-10">
      {experience.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Experience</h3>
            <a
              href={siteConfig.resume.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/5"
            >
              <FileText size={16} /> {siteConfig.resume.downloadLabel}
            </a>
          </div>

          <div className="grid gap-6">
            {experience.map((item, index) => (
              <ResumeItem
                key={`${item.title}-${item.organization}`}
                icon={iconMap["code"]}
                left={item.date}
                title={item.title}
                org={item.organization}
                body={item.description}
                technologies={item.technologies}
                accent={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pt-2">
            <h3 className="text-xl font-semibold">Education</h3>
          </div>

          <div className="grid gap-6">
            {education.map((item, index) => (
              <ResumeItem
                key={`${item.title}-${item.organization}`}
                icon={iconMap.education}
                left={item.date}
                title={item.title}
                org={item.organization}
                body={item.description}
                technologies={[]}
                accent={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 p-5">
          <div className="mb-3 font-semibold">Technical skills</div>
          <ul className="grid gap-y-2 text-sm text-neutral-300 sm:grid-cols-2">
            {siteConfig.resume.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="mb-3 font-semibold">Languages</div>
          <ul className="grid gap-y-2 text-sm text-neutral-300 sm:grid-cols-2">
            {siteConfig.resume.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ResumeItem({
  icon: Icon,
  left,
  title,
  org,
  body,
  technologies,
  accent,
}: {
  icon: LucideIcon;
  left: string;
  title: string;
  org: string;
  body: string;
  technologies: string[];
  accent?: boolean;
}) {
  return (
    <div className={`grid gap-4 rounded-2xl border border-white/10 p-5 md:grid-cols-[48px_160px_1fr] md:gap-6 ${accent ? "bg-white/[0.04]" : "bg-white/[0.02]"}`}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
        <Icon size={21} className="text-violet-400" />
      </div>

      <div className="text-sm text-neutral-400">{left}</div>

      <div>
        <div className="text-lg font-semibold">
          {title}
          <span className="font-normal text-neutral-400"> · {org}</span>
        </div>

        <p className="mt-2 text-sm text-neutral-300">{body}</p>

        {technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span key={technology} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-300">
                {technology}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
