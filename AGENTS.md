You are a senior front-end engineer and motion designer. Create a file named AGENTS.md in the repository root containing the project context below, formatted clearly with headings. Do not write any application code yet. When done, summarise the file in five lines.

PROJECT
A redesigned marketing website for ANM Technologies, a Belgian IT company (Zaventem) that builds websites, custom software, mobile apps and AI and automation solutions, and provides IT resourcing. Goal: an impressive, fast, trustworthy site that shows what the company does through interaction, not stock images.

TWO SIGNATURE CONCEPTS
1. "Build it live": an interactive hero where the visitor picks or types what their business needs, and a mini preview (website, app screen, or automation flow) assembles in front of them. It is a clearly labelled demo using scripted scenarios, no live AI calls.
2. "Automation pipeline": a scroll-driven story where messy inputs (emails, spreadsheets, forms, chat messages) travel through stations (understand, route, build, deliver) and come out as a clean dashboard. Each station maps to a service.

STACK
Vite, React, TypeScript (strict), plain CSS with design tokens as CSS variables and CSS modules, GSAP with ScrollTrigger, Lenis. No other runtime dependencies without asking me first. No WebGL or Three.js.

QUALITY RULES
- Mobile first. Everything works from 360px wide.
- Respect prefers-reduced-motion: no scroll hijacking, no looping animation, final states shown instead.
- Keyboard accessible, visible focus, semantic HTML, WCAG AA contrast, alt text, aria-live for dynamic demo updates.
- Light and dark themes through tokens, following the system setting.
- Performance budget: mobile Lighthouse Performance 90+, Accessibility 95+, initial JS under 250 KB gzipped, zero layout shift. Lazy-load anything below the fold.
- Animate only transform and opacity where possible. Clean up all GSAP and ScrollTrigger instances on unmount.

CONTENT RULES
- All copy lives in src/content/site.ts. Components never hard-code marketing text.
- Never invent clients, case studies, testimonials, awards, statistics or certifications. Where real content is missing, use a visibly marked placeholder such as "[PLACEHOLDER: real case study needed]".
- Real facts allowed: address Vilvoordelaan 55, 1930 Zaventem, Belgium; email contact@anmtech.be; phone +32 466 18 11 34.
- Do not copy the existing site's images or logo. Use a text wordmark until a logo file is supplied.

DESIGN DIRECTION
Confident, modern, editorial. Avoid clichés: no glowing node networks, no matrix or hacker aesthetics, no generic gradient blobs, no stock photos. Two typefaces at most. One accent colour family (a blue derived from ANM's existing brand) plus a secondary purple used sparingly. Generous whitespace. Sentence-case headings, no all-caps eyebrow labels.

WORKFLOW RULES
- Work only on the current phase. Do not build ahead.
- After each phase: run the type check, lint and build, fix all errors, then give me a short summary of what was created and how to verify it.
- Ask before adding any dependency not listed above.
- Keep components small and typed. Comment only non-obvious logic.
- Commit at the end of each phase with a clear message.