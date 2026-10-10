export type SectionKey = "home" | "about" | "projects" | "resume" | "template" | "contact";

export type SocialLinks = {
  github?: string;
  linkedin?: string;
  email?: string;
  x?: string;
};

export type ProjectItem = {
  title: string;
  role?: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
};

export type ExperienceItem = {
  title: string;
  organization: string;
  date: string;
  description: string;
  technologies: string[];
};

export type EducationItem = {
  title: string;
  organization: string;
  date: string;
  description: string;
};

export const siteConfig = {
  name: "Your Name",
  title: "Product Developer",
  location: "City, Country",
  email: "hello@example.com",
  accent: "#7E4DEE",
  profileImage: "/portrait.jpg",
  resumePath: "/resume.pdf",
  seo: {
    title: "Your Name | Product Developer",
    description:
      "Portfolio template for a product-minded developer building polished digital experiences.",
    url: "https://example.com",
    ogImage: "/portrait.jpg",
  },
  hero: {
    greeting: "Hello,",
    headline: "Add your personal tagline here.",
    description:
      "Write a short introduction about yourself, your expertise, and what you build.",
    secondaryDescription:
      "Describe your professional background, technical skills, and interests.",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ],
  sections: {
    home: true,
    about: true,
    projects: true,
    resume: true,
    template: true,
    contact: true,
  } as Record<SectionKey, boolean>,
  about: {
    heading: "About me",
    subtitle: "Product developer • Full-stack builder • Problem solver",
    intro: [
      "Add a brief introduction about yourself and the type of work you do.",
      "Share your background, strengths, and the kinds of problems you enjoy solving.",
      "Describe the technologies, projects, and interests you want to highlight.",
    ],
    tech: {
      featured: [
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "Python",
        "PostgreSQL",
        "Docker",
        "AWS",
      ],
      categories: {
        "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
        "Backend": ["Node.js", "Python", "REST APIs", "PostgreSQL", "Firebase"],
        "Product & Design": ["UX Strategy", "Design Systems", "Prototyping", "Accessibility"],
        "Tooling": ["GitHub", "Docker", "CI/CD", "Vercel", "Figma"],
      },
    },
    current: {
      visible: true,
      heading: "Currently I’m...",
      items: [
        "Share what you're currently working on.",
        "Describe any experiments, collaborations, or initiatives you are exploring.",
      ],
    },
    outside: {
      visible: true,
      heading: "Outside of work I’m...",
      items: [
        "Add your hobbies and interests here.",
        "Add a few personal interests that reflect who you are."
      ],
    },
  },
  resume: {
    visible: true,
    heading: "Resume",
    subtitle: "Quick view + full PDF download.",
    downloadLabel: "Download CV",
    skills: ["React & TypeScript", "Python & APIs", "Node.js & SQL", "Product-focused engineering", "Git & CI/CD"],
    languages: ["English"],
    pdfPath: "/resume.pdf",
  },
  template: {
    visible: true,
    title: "Template & stack",
    subtitle: "Grab the code and see how it’s built.",
    description:
      "A reusable portfolio template built with Next.js and Tailwind CSS for developers who want a polished personal site without the boilerplate.",
    repoUrl: "https://github.com/yourusername/portfolio-template",
    docsUrl: "https://github.com/yourusername/portfolio-template#readme",
    stack: [
      "Next.js (App Router) + React",
      "TypeScript",
      "Tailwind CSS",
      "lucide-react",
      "Resend",
      "Vercel",
    ],
  },
  contact: {
    visible: true,
    showForm: true,
    title: "Contact",
    subtitle: "Let’s build something cool.",
    socials: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      email: "hello@example.com",
    },
    emailCopyLabel: "Copy",
  },
  footer: {
    copyrightLabel: "Built for the web.",
    showBackToTop: true,
  },
} as const;

export const defaultProjectImage = "/images/project-placeholder.svg";

export const navigationItems = siteConfig.nav.map((item) => ({
  ...item,
  id: item.href.replace("#", ""),
}));

export const visibleSectionIds = Object.entries(siteConfig.sections)
  .filter(([, enabled]) => enabled)
  .map(([id]) => id);
