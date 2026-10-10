# Portfolio Template

A clean, production-ready portfolio template built with Next.js, React, TypeScript, and Tailwind CSS. It keeps the original dark aesthetic, accent-driven styling, timeline navigation, project cards, and mobile-friendly contact flow while making the content easy to customize.

This project is designed to be open-source and reusable: edit a single config file, swap in your own content, and deploy to Vercel without redesigning the entire site.

---

## Features

- Dark portfolio design with a single accent color
- Responsive hero, about, projects, resume, and contact sections
- Config-driven content via `src/config/site.ts`
- Contact form connected to Resend with graceful fallback when env vars are missing
- Project cards and resume content ready for easy customization
- Sticky timeline navigation and mobile-friendly email interactions
- Works as a Vercel deployment without additional setup beyond environment variables

---

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Resend
- Vercel

---

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Copy the environment example and add your values:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
npm run dev
```

4. Open http://localhost:3000

---

## Configuration

The main customization point is `src/config/site.ts`.

Update:

- your name and title
- social links
- email address
- about copy and skill groups
- project section visibility
- template CTA content
- site metadata

Use this file to replace the placeholder hero text, professional intro, current work items, and personal interests. The page is composed in `src/app/page.tsx`, and the rest of the layout stays consistent as you edit the config.

### Replace placeholder content

- `src/config/site.ts` — hero text, about copy, current work, outside-of-work interests, and profile metadata
- `src/data/projects.ts` — project titles, roles, descriptions, and stack examples
- `content/projects/*.md` — project markdown entries for featured and compact project cards
- `content/experience/*.md` — resume experience entries such as job title, company name, and role summary
- `public/portrait.jpg` and `public/resume.pdf` — replace the default profile image and document with your own assets

---

## Contact form and email setup

The contact route in `src/app/api/contact/route.ts` uses Resend when `RESEND_API_KEY` is configured.

Set these values in `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=hello@example.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Behavior:

- If Resend is configured, the form sends a message.
- If it is not configured, the route fails gracefully with a clear error response and does not crash the app.

---

## Deployment

This app is ready for Vercel deployment.

1. Push the repo to GitHub.
2. Import it into Vercel.
3. Add the environment variables in the Vercel dashboard.
4. Deploy the project.

---

## Project files worth editing

- `src/config/site.ts` — global content and settings
- `src/data/projects.ts` — portfolio project entries
- `src/components/About.tsx` — about text and skill groups
- `src/components/Contact.tsx` — email/social cards
- `src/components/ContactForm.tsx` — form UI
- `src/app/api/contact/route.ts` — Resend email handling
- `src/app/layout.tsx` — metadata and app shell

---

## Notes

- Replace the placeholder avatar and project artwork in `public/` with your own assets.
- Remove or customize sections via the `sections` object in `src/config/site.ts`.
- Keep the design intact while changing the words, links, and content to match your portfolio.

