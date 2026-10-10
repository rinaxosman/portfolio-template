
# 💻 Portfolio Template

A clean, production-ready portfolio template built with Next.js, React, TypeScript, and Tailwind CSS. It keeps the original dark aesthetic, accent-driven styling, timeline navigation, project cards, and mobile-friendly contact flow while making the content easy to customize.

This project is designed to be open-source and reusable. Customize it manually through configuration files, or **use GitHub Copilot to build your portfolio from your resume** with minimal coding required.

## ✨ Features

- Dark portfolio design with a single accent color
- Responsive hero, about, projects, resume, and contact sections
- Config-driven content via `src/config/site.ts`
- **AI-assisted customization using GitHub Copilot and your resume**
- Contact form powered by Resend with graceful fallback when environment variables are missing
- Customizable project cards and resume content
- Sticky timeline navigation and mobile-friendly email interactions
- Easy deployment to Vercel

## 🧱 Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Resend
- Vercel

## 🚀 Quick start

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

## 🤖 Customize with GitHub Copilot

**Want to personalize the entire website without manually editing the code?**

You can use GitHub Copilot in VS Code to customize this template based on your resume, projects, and preferences.

### How to use it

1. Open this repository in **VS Code**.
2. Install the **GitHub Copilot** extension.
3. Add your resume (PDF or Markdown) to the project folder.
4. Open **Copilot Chat** and select **Agent mode**.
5. Copy and paste the prompt below.
6. Answer any questions Copilot asks about missing information.
7. Preview your customized website using `npm run dev`.

### 📋 Copy this prompt into Copilot

> I'm using this Next.js portfolio template to create my personal portfolio website.
>
> **Your task is to fully customize this website using my resume and any additional information I provide.**
>
> First, inspect the repository structure, configuration files, Markdown content, and components to understand how the template works.
>
> Read my resume and extract:
> - Name, professional title, and background
> - Work experience and accomplishments
> - Education and certifications
> - Technical skills and technologies
> - Projects and achievements
>
> **Before making changes, ask me for any important missing information**, including:
> - Preferred professional title and short introduction
> - GitHub, LinkedIn, and other social links
> - Contact email and location (optional)
> - Projects not included in my resume, including descriptions and links
> - Profile picture and resume filename
> - Personal interests and activities
> - Preferred accent color
> - Sections I want to display or hide
>
> Ask questions in a clear, organized way and allow me to skip optional details. Do not invent information, achievements, projects, or links.
>
> Once you have enough information:
>
> 1. Update `src/config/site.ts` with my personal information, hero introduction, About section, skills, and social links.
> 2. Populate my work experience and education using the existing configuration and Markdown files.
> 3. Update the Projects section with my actual projects, descriptions, technologies, and links.
> 4. Rewrite descriptions to be concise, professional, and technically accurate without exaggerating experience or inventing metrics.
> 5. Organize my technical skills into relevant categories.
> 6. Update website metadata, SEO information, and social links.
> 7. Configure my profile picture and resume download using the files I provide.
> 8. Hide sections that I don't want or that have no relevant content.
> 9. Remove all instructional placeholder content from the finished website.
> 10. Preserve the existing design, animations, navigation, and responsive layout.
>
> **Important requirements:**
> - Do not redesign the website.
> - Use the existing configuration and Markdown architecture wherever possible.
> - Do not hardcode personal information into React components unnecessarily.
> - Do not invent experience, achievements, or project details.
> - Do not publish sensitive personal information without my approval.
> - Do not remove existing functionality unnecessarily.
> - Do not configure Resend with fake credentials; explain the required setup steps instead.
>
> After implementing the changes, run TypeScript checks and the production build, fix any errors, and verify that the website renders correctly.
>
> Finally, summarize which files you modified, any missing information, and the remaining steps needed before deploying to Vercel.
>
> **Goal:** Transform this template into a complete, polished, professional portfolio that accurately reflects my experience, skills, and projects, with minimal manual coding.

### After Copilot finishes

Run the website locally:

```bash
npm run dev
```

Review your content, check the desktop and mobile layouts, and verify that your images, resume download, and external links work correctly.

You can also ask Copilot to make further changes, such as:

- "Make my About section more concise."
- "Highlight my backend development experience."
- "Change the accent color to blue."
- "Add another project to my portfolio."

**Prefer editing everything yourself?** Follow the manual configuration instructions below.

## ⚙️ Configuration

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

### 📝 Replace placeholder content

- `src/config/site.ts` — hero text, about copy, current work, outside-of-work interests, and profile metadata
- `src/data/projects.ts` — project titles, roles, descriptions, and stack examples
- `content/projects/*.md` — project Markdown entries for featured and compact project cards
- `content/experience/*.md` — resume experience entries such as job title, company name, and role summary
- `public/portrait.jpg` and `public/resume.pdf` — replace the default profile image and document with your own assets

## 📬 Contact form and email setup

The contact route in `src/app/api/contact/route.ts` uses [Resend](https://resend.com) when `RESEND_API_KEY` is configured.

To enable the contact form:

1. Create a free Resend account.
2. Generate an API key from the Resend dashboard.
3. Verify your sending domain in Resend.
4. Add the following values to `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=hello@example.com
CONTACT_FROM_EMAIL=Portfolio <contact@yourdomain.com>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace the example addresses with your own. The sender address must use a domain you've verified in Resend for production sending.

**Behaviour:**

- If Resend is configured correctly, the contact form sends messages to your designated email.
- If it is not configured, the route returns a clear error response without crashing the website.
- Never commit `.env.local` or your API keys to GitHub.

For production, add the same environment variables to your Vercel project settings.

## 🌐 Deployment

This app is ready for Vercel deployment.

1. Push the repository to GitHub.
2. Import it into [Vercel](https://vercel.com).
3. Add the required environment variables in the Vercel dashboard.
4. Deploy your project.
5. Optionally connect your custom domain through Vercel's domain settings.

## 📂 Project files worth editing

- `src/config/site.ts` — global content and settings
- `src/data/projects.ts` — portfolio project entries
- `src/components/About.tsx` — about text and skill groups
- `src/components/Contact.tsx` — email/social cards
- `src/components/ContactForm.tsx` — form UI
- `src/app/api/contact/route.ts` — Resend email handling
- `src/app/layout.tsx` — metadata and app shell

## 📌 Notes

- Replace the placeholder avatar and project artwork in `public/` with your own assets.
- Remove or customize sections via the `sections` object in `src/config/site.ts`.
- Keep the design intact while changing the words, links, and content to match your portfolio.
- If you're using Copilot, review all generated content before publishing to ensure accuracy.
