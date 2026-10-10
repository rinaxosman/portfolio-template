"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export default function Contact() {
  const email = siteConfig.contact.socials.email ?? siteConfig.email;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const input = document.createElement("input");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    } finally {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    }
  };

  const cards = [
    email
      ? {
          key: "email",
          href: `mailto:${email}`,
          label: "Email",
          value: email,
          icon: Mail,
          type: "email",
        }
      : null,
    siteConfig.contact.socials.linkedin
      ? {
          key: "linkedin",
          href: siteConfig.contact.socials.linkedin,
          label: "LinkedIn",
          value: "LinkedIn",
          icon: Linkedin,
          type: "social",
        }
      : null,
    siteConfig.contact.socials.github
      ? {
          key: "github",
          href: siteConfig.contact.socials.github,
          label: "GitHub",
          value: "GitHub",
          icon: Github,
          type: "social",
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    href: string;
    label: string;
    value: string;
    icon: typeof Mail;
    type: "email" | "social";
  }>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map(({ key, href, label, value, icon: Icon, type }) => (
        <div key={key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          {type === "email" ? (
            <div className="flex items-center gap-3">
              <Mail className="shrink-0" />
              <div className="min-w-0">
                <div className="text-sm text-neutral-400">{label}</div>
                <div className="truncate font-medium" title={value}>{value}</div>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                title="Copy to clipboard"
                className="ml-auto shrink-0 cursor-pointer rounded-full border border-white/15 px-3 py-1 text-sm hover:bg-white/5"
                aria-label="Copy email to clipboard"
              >
                {copied ? "Copied" : siteConfig.contact.emailCopyLabel}
              </button>
            </div>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3"
              aria-label={label}
            >
              <Icon className={label === "LinkedIn" ? "text-[#0A66C2] transition-colors duration-200" : "transition-colors duration-200 group-hover:text-white"} />
              <span className="transition-colors">{label}</span>
            </a>
          )}
        </div>
      ))}

      {siteConfig.contact.showForm && (
        <div className="md:col-span-2 xl:col-span-3">
          <ContactForm />
        </div>
      )}
    </div>
  );
}
