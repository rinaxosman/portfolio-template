import Header from "@/components/Header";
import { Hero } from "@/components/Hero";
import Section from "@/components/Section";
import ProjectsGrid from "@/components/ProjectsGrid";
import About from "@/components/About";
import { Resume } from "@/components/Resume";
import Contact from "@/components/Contact";
import TemplateCTA from "@/components/TemplateCTA";
import Footer from "@/components/Footer";
import ScrollTimeline from "@/components/ScrollTimeline";
import { siteConfig } from "@/config/site";

const SECTIONS = [
  { id: "home", label: "Home" },
  ...(siteConfig.sections.about ? [{ id: "about", label: "About" }] : []),
  ...(siteConfig.sections.projects ? [{ id: "projects", label: "Projects" }] : []),
  ...(siteConfig.sections.resume ? [{ id: "resume", label: "Resume" }] : []),
  ...(siteConfig.sections.template ? [{ id: "template", label: "Template" }] : []),
  ...(siteConfig.sections.contact ? [{ id: "contact", label: "Contact" }] : []),
];

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      <ScrollTimeline sections={SECTIONS} />

      <div className="mx-auto w-full max-w-6xl px-4 bp1130:px-0">
        <Hero />

        {siteConfig.sections.about && (
          <Section id="about" title={siteConfig.about.heading} subtitle={siteConfig.about.subtitle}>
            <About />
          </Section>
        )}

        {siteConfig.sections.projects && (
          <Section id="projects" title="Projects" subtitle="Selected work I’m proud of.">
            <ProjectsGrid />
          </Section>
        )}

        {siteConfig.sections.resume && (
          <Section id="resume" title={siteConfig.resume.heading} subtitle={siteConfig.resume.subtitle}>
            <Resume />
          </Section>
        )}

        {siteConfig.sections.template && (
          <Section id="template" title={siteConfig.template.title} subtitle={siteConfig.template.subtitle}>
            <TemplateCTA />
          </Section>
        )}

        {siteConfig.sections.contact && (
          <Section id="contact" title={siteConfig.contact.title} subtitle={siteConfig.contact.subtitle}>
            <Contact />
          </Section>
        )}
      </div>

      <Footer />
    </main>
  );
}
