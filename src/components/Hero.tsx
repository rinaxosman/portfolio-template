"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Copy, ExternalLink } from "lucide-react";
import { ACCENT } from "@/lib/constants";
import { siteConfig } from "@/config/site";
import type { CSSProperties } from "react";

const accentStyle: CSSProperties & Record<"--accent", string> = {
  "--accent": ACCENT,
};

export function Hero() {
  const email = siteConfig.contact.socials.email ?? siteConfig.email;
  const mailHref = `mailto:${email}`;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onEsc);
    }

    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const handleCopy = async () => {
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
      window.setTimeout(() => setCopied(false), 1200);
    }
  };

  const socialLinks = [
    { href: siteConfig.contact.socials.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: siteConfig.contact.socials.github, label: "GitHub", icon: Github },
  ].filter((link) => Boolean(link.href));

  return (
    <section id="home" className="relative overflow-visible">
      <div className="mx-auto w-full max-w-[1130px] px-6 py-20 sm:px-8 md:py-28 lg:px-10 xl:px-6">
        <div className="grid items-center gap-y-10 md:grid-cols-2 md:gap-y-0">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="relative mb-5 h-40 w-40 overflow-hidden rounded-full ring-2 ring-white/10 sm:h-44 sm:w-44 lg:h-48 lg:w-48">
              <Image
                src={siteConfig.profileImage}
                alt={siteConfig.name}
                fill
                priority
                quality={95}
                sizes="(min-width:1024px) 12rem, (min-width:640px) 11rem, 10rem"
                className="object-cover"
              />
            </div>

            <h2 className="text-3xl font-bold">{siteConfig.name}</h2>
            <p className="mt-1 text-sm uppercase tracking-wide text-neutral-400">{siteConfig.title}</p>
            <p className="text-xs tracking-wide text-neutral-400">{siteConfig.location}</p>

            <div className="mt-4 flex gap-4 text-neutral-300" style={accentStyle}>
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={label}
                >
                  <Icon
                    size={30}
                    className={label === "LinkedIn" ? "text-[#0A66C2] transition-colors duration-200 group-hover:text-white" : "text-[var(--accent)] transition-colors duration-200 group-hover:text-white"}
                  />
                </a>
              ))}

              {email && (
                <div className="relative">
                  <a
                    href={mailHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer sm:hidden"
                    aria-label="Email"
                  >
                    <Mail size={30} className="text-[var(--accent)] transition-colors duration-200 group-hover:text-white" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    className="hidden cursor-pointer sm:block group"
                    aria-label="Email options"
                  >
                    <Mail size={30} className="text-[var(--accent)] transition-colors duration-200 group-hover:text-white" />
                  </button>

                  <div
                    ref={popRef}
                    role="menu"
                    className={[
                      "absolute bottom-full left-1/2 z-50 hidden -translate-x-1/2 mb-3 sm:block",
                      "rounded-xl border border-white/10 bg-neutral-900/95 px-3 py-2 shadow-lg ring-1 ring-white/10 backdrop-blur",
                      "origin-bottom transition-all duration-200 ease-out",
                      open
                        ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-1 scale-95 opacity-0",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-sm hover:bg-white/5"
                        role="menuitem"
                        aria-label="Copy email"
                      >
                        <Copy className="h-4 w-4" />
                        {copied ? "Copied" : "Copy"}
                      </button>

                      <a
                        href={mailHref}
                        onClick={() => setOpen(false)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-sm hover:bg-white/5"
                        role="menuitem"
                        aria-label="Compose email"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Compose
                      </a>
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-neutral-900/95" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-0">
            <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">{siteConfig.hero.greeting}</h1>
            <p className="mt-8 max-w-xl text-neutral-300">{siteConfig.hero.headline}</p>
            <p className="mt-8 max-w-xl text-neutral-300">{siteConfig.hero.description}</p>
            <p className="mt-6 max-w-xl text-neutral-300">{siteConfig.hero.secondaryDescription}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {siteConfig.resume.visible && (
                <a
                  href="#resume"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2 font-medium text-neutral-950 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(128,112,255,0.6)]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Resume
                </a>
              )}

              {siteConfig.sections.projects && (
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 hover:bg-white/5"
                >
                  Projects <ArrowRight size={16} />
                </a>
              )}

              {siteConfig.template.visible && (
                <a
                  href="#template"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 hover:bg-white/5"
                >
                  Use my template <ArrowRight size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
