> September 20, 2026 update: the user explicitly approved a photographic black/gold redesign with motion after confirming the advisory business. The visual layout restrictions below are historical; see DESIGN-NOTES.md and the current tokens/styleguide. Business scope and independence remain.

# Leadra — website specification

Handoff for the developer. Everything here is decided; where something is genuinely open it is
marked **[client to confirm]**.

---

## 1. What the site is for

Leadra is a three-partner boutique advisory firm in Riyadh, advising boards and executive teams on
leadership, cybersecurity, and AI governance. The people it wants to reach are board chairs, audit
and risk committee chairs, CEOs, and deputy ministers — a few hundred people in the Kingdom, most of
whom will arrive because someone they trust mentioned the firm.

That makes this a **credibility site, not a lead-generation site**. Success is a small number of
serious inbound conversations, not traffic. Two consequences for the build:

- Optimise for the person who is checking whether the firm is real and serious, having already heard
  the name. Make it easy to see who the partners are, what the firm does and does not do, and how to
  reach a partner directly.
- Do not add growth-marketing furniture — pop-ups, gated downloads, chat widgets, newsletter
  interstitials, countdown urgency. In this market they cost credibility.

**Voice.** Plain, direct, unhurried. The firm sells judgement, so the writing has to demonstrate it.
Never the word "coaching" — the firm sells board and executive advisory; coaching is one delivery
method inside a transition programme, never the category. Never "and more". One tagline only:
*Lead further.*

---

## 2. Sitemap

```
/                     Home
/practices/           Overview of the three practices
  /practices/leadership-and-governance/
  /practices/cyber-governance/
  /practices/ai-governance/
/approach/            How an engagement runs, scope boundary, independence policy
/people/              Partner profiles
/insights/            Briefing papers index
  /insights/<slug>/   Individual paper
/contact/             Enquiry form and direct contact
/privacy/             Privacy notice (PDPL)
/ar/                  Arabic mirror of all of the above
```

Phase one can ship with Home, Approach, People, Contact, Privacy and a single practices page; the
three practice detail pages and Insights can follow. Do not publish an empty Insights index.

**Not in scope, and should not be built:** careers page (no hiring until 2029), client logo wall,
testimonials, case studies, pricing, service-comparison tables, a resources library.

---

## 3. Page requirements

### Home
Order is fixed; it moves from the client's question to the firm's answer to proof.

1. **Hero** — three questions a board is actually facing, set large in the display face, then a
   short position statement and the tagline. No image, no video, no button. The reference build
   shows the treatment.
2. **Who we are** — regulator, executive, and board experience, in prose. Two paragraphs.
3. **Practices** — three items with a one-line description and the partner who owns each. Links to
   detail pages when they exist.
4. **What we don't do** — the dark band. This is the signature section: an explicit list of the
   technical services the firm does not perform, and why that protects the client. Do not soften it
   into a benefits list.
5. **How an engagement runs** — four numbered steps. This is the only place numbering is allowed,
   because it is genuinely a sequence.
6. **Insights** — three most recent papers, title and reading time only.
7. **Contact** — short form, dark band.

### People
Each partner: name, role, a photograph (plain background, ivory or obsidian, no boardroom staging),
120–160 words of biography written in the third person, and current governance roles. No social
links except LinkedIn. **[client to confirm]** which prior employers may be named — some partners
have cooling-off obligations, so this list must be cleared before publication.

### Approach
Long-form page. Engagement lifecycle, the independence and conflict-of-interest policy, how
associates and external specialists are used and supervised, and how impact is measured. This page
does the persuading for a reader who is already interested; it can be dense.

### Insights
Reverse-chronological. Each paper has a title, standfirst, publication date, reading time, and a
downloadable PDF version in both languages. No author bylines on the index; byline on the article.
No comments, no share counts.

### Contact
The form asks four things and no more: name, organisation and role, work email, and what they are
weighing up. Confirmation states that a partner will read it and reply within two working days —
so the firm must actually do that. Also publish a direct email address and a Riyadh address once the
commercial registration is complete.

---

## 4. Design system

`tokens.css` is the canonical source; `tokens.json` mirrors it for JS or Tailwind config.
`styleguide.html` is the living component reference — build against it and keep it updated.

Key rules that are easy to get wrong:

- **Two accents, never swapped.** Bronze `#7E5F35` is the accent on light surfaces; champagne
  `#DCC9AB` is the accent on dark. Champagne on ivory is 1.47:1 and must never carry text.
- **Cormorant Garamond is display only**, never below 20px. Montserrat carries all body, UI, and
  small text.
- **Tracked caps (0.22em) appear only as section labels in the rail.** Not headings, not buttons,
  not navigation.
- **Sentence case** for buttons, links, and navigation. No arrows appended to link text.
- Border radius is 2px everywhere. This is a document, not an app.
- Reading measure capped at 68 characters.

### Logo usage
- Full mark above 32px / 11mm. Below that use `logo-compact.svg`, which drops the base fan.
- Obsidian mark on light grounds, champagne on dark. Ivory is the single-colour reversed option.
- Clear space on all sides equals the width of one flute.
- Never apply a gradient or metallic fill, never stretch, never place on busy photography.

**Important:** the supplied brand sheet is a JPEG mock-up and contains no vector artwork. The SVGs in
`assets/` were traced from it and are clean at all working sizes, but if the client can obtain the
original vector from the designer, replace them.

---

## 5. Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| ≥ 1024px | Two-column rail layout. Rail is sticky. Full navigation. |
| 861–1023px | Same, with reduced gutters. |
| ≤ 860px | Rail collapses above the content; margin notes hidden; single column. |
| ≤ 640px | Navigation becomes a menu button and a full-screen panel. Display type scales down. |

Test at 320px width — a deputy minister forwarding a link on an older phone is a real scenario.
Nothing may scroll horizontally at any width.

---

## 6. Accessibility

Target **WCAG 2.2 AA**, and treat it as a requirement rather than an aspiration: this firm advises
government entities that are themselves held to accessibility standards.

- All colour combinations in use are listed with their ratios in `styleguide.html`. Do not introduce
  new combinations without checking.
- Visible focus indicator on every interactive element: 2px bronze outline, 3px offset. Never
  `outline:none`.
- Full keyboard operability, logical tab order, and a skip link to `#main`.
- Form labels always visible. Never placeholder-as-label. Errors linked with `aria-describedby` and
  announced with `role="alert"`, and they say what to do, not just what is wrong.
- Respect `prefers-reduced-motion`; the token file already zeroes the duration.
- Semantic landmarks: one `<h1>` per page, `<main>`, `<nav aria-label>`, `<footer>`. Note that the
  reference build has no `<h1>` yet — the hero questions are a list, so give the home page an `<h1>`
  that states what the firm is, visually hidden if the design has no room for it.
- Hide off-screen content by clipping, not by `left:-9999px`. In RTL a negative offset extends the
  scrollable area and creates horizontal overflow across the whole Arabic site — this bit the
  reference build and is easy to miss in testing.
- Images need real alt text; the logo in the masthead is decorative next to the wordmark and takes
  `alt=""`.

---

## 7. Arabic and RTL

Not a phase two. Etimad submissions, ministry decks, and board packs are bilingual, and a
Latin-only site signals an outsider.

- Serve Arabic at `/ar/` with `lang="ar" dir="rtl"`, and cross-link with `hreflang`.
- Use CSS logical properties throughout (`margin-inline-start`, `padding-inline`, `inset-inline`) so
  one stylesheet serves both directions.
- Arabic typeface: **IBM Plex Sans Arabic**. Set `letter-spacing:0` for Arabic — Latin tracking does
  not transfer. Increase line-height slightly and size by roughly 5% for optical parity.
- The logo does not mirror; the lockup order does — mark on the right in RTL.
- Arabic copy must be written, not machine-translated. The partners write in Arabic; budget review
  time rather than translation cost.
- **[client to confirm]** whether the Arabic site is the default for visitors in the Kingdom.

---

## 8. Security and privacy

The firm advises on cybersecurity. Its own site is the first thing a sceptical CISO will test, so
treat the following as launch blockers rather than hardening tasks.

- HTTPS only, HSTS with `preload`, TLS 1.2+ and modern ciphers.
- A real Content-Security-Policy (no `unsafe-inline`; hash or nonce the styles),
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy` denying camera, microphone, and geolocation.
- **No third-party scripts.** No Google Analytics, no tag manager, no chat widget, no embedded
  fonts from a third party if the client prefers self-hosting — self-host Cormorant and Montserrat
  as WOFF2 and remove the Google Fonts link if so **[client to confirm]**.
- Form submissions: server-side validation, rate limiting, and a honeypot or timing check rather
  than a CAPTCHA. Enquiries are professional correspondence — store them encrypted at rest, restrict
  access to the partners, and set a retention period.
- **PDPL.** Publish a privacy notice covering what is collected, the lawful basis, retention, and
  how to request deletion. Name a contact for data requests. Because the site sets no analytics or
  advertising cookies, no consent banner is needed — keep it that way.
- Registrar lock and DNSSEC on the domain; SPF, DKIM, and DMARC on email, with DMARC moving to
  `p=reject` once monitored.
- Run the site past an external scanner before launch and keep the report.

---

## 9. Performance

Static-first. There is no reason for this site to be slow.

- Budget: under 150KB of JavaScript on any page, ideally none on Home; Largest Contentful Paint
  under 1.5s on a 4G connection; Cumulative Layout Shift under 0.05.
- Self-hosted WOFF2 with `font-display:swap` and preloaded display face. Subset the Latin and Arabic
  fonts.
- SVG for the logo. Photographs as AVIF with WebP fallback, sized and lazy-loaded below the fold.
- No framework is required. If the client wants a CMS, a static site generator with a Git-backed
  editor is the right shape **[client to confirm]** — the partners will publish a briefing paper
  every quarter, not every day.

---

## 10. SEO and metadata

- Unique title and meta description per page. Titles: `Page — Leadra`.
- Structured data: `Organization` on Home with the Arabic and English names, and `Article` on
  insight pages.
- `hreflang` pairs for every bilingual page, plus `x-default`.
- XML sitemap and a `robots.txt` that allows everything except the enquiry endpoint.
- Open Graph and Twitter card images: the obsidian lockup on a plain ground, 1200×630. No text
  beyond the wordmark.
- The firm will rank for its own name and for a small number of governance terms. Do not build
  keyword landing pages; they would undercut the positioning.

---

## 11. Analytics

Privacy-respecting and self-hosted or EU-hosted — Plausible, Fathom, or GoatCounter
**[client to confirm]**. Page views and referrers only. No user-level tracking, no session recording,
no heatmaps. The one number that matters is enquiries received, and that arrives by email.

---

## 12. Launch checklist

- [ ] Partner names, titles, and biographies cleared against cooling-off obligations
- [ ] Prior employers named on `/people/` approved by counsel
- [ ] Arabic copy written and reviewed by a partner
- [ ] Commercial registration number and Riyadh address added to the footer
- [ ] Privacy notice reviewed against PDPL
- [ ] Enquiry form tested end to end, including the two-working-day reply commitment
- [ ] Security headers verified; external scan clean
- [ ] Keyboard-only pass and screen-reader pass on Home, Approach, and Contact
- [ ] 320px width pass with no horizontal scroll
- [ ] Arabic and English pages cross-linked with correct `hreflang`
- [ ] Logo minimum sizes respected; compact cut used in the favicon and masthead on mobile
- [ ] No third-party requests in the network tab

---

## 13. What is in this package

```
README.md            Start here
SPEC.md              This document
tokens.css           Canonical design tokens
tokens.json          Same values for JS / Tailwind
index.html           Reference build of the homepage, self-contained
styleguide.html      Component library and usage rules
index-ar.html        RTL reference
assets/              Logo in obsidian, champagne, ivory; compact cut; favicon
```

The reference pages inline their CSS so they open from disk without a server. In the real build,
extract it to a shared stylesheet sourced from `tokens.css`.
