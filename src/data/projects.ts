export type Project = {
  title: string;
  role?: string;
  description: string;
  tech: string[];
  href: string;
  image: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Project Title",
    role: "Role or Team",
    description:
      "Briefly describe your project, the problem it solves, and the value it delivers.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    href: "#",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Project Title",
    role: "Role or Team",
    description:
      "Add a short summary of your work, the stack you used, and the outcome you delivered.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    href: "#",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Project Title",
    role: "Role or Team",
    description:
      "Describe the project, your responsibilities, and what makes it worth highlighting.",
    tech: ["React", "Python", "AI", "UX"],
    href: "#",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
  },
];