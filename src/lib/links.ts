import { siteConfig } from "@/config/site";

export const LINKS = {
  emailto: `mailto:${siteConfig.contact.socials.email ?? siteConfig.email}`,
  email: siteConfig.contact.socials.email ?? siteConfig.email,
  linkedin: siteConfig.contact.socials.linkedin ?? "",
  github: siteConfig.contact.socials.github ?? "",
  resume: siteConfig.resume.pdfPath,
  repo: siteConfig.template.repoUrl,
  substack: "",
};
