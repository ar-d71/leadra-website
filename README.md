# Leadra — website package

Everything needed to build the site. Read `SPEC.md` first; it carries the decisions.

## Files

| File | What it is |
|---|---|
| `SPEC.md` | Build specification: sitemap, page requirements, accessibility, RTL, security, launch checklist |
| `tokens.css` | Canonical design tokens as CSS custom properties |
| `tokens.json` | The same values for JS or a Tailwind config |
| `index.html` | Reference build of the homepage — real copy, real layout, self-contained |
| `styleguide.html` | Component library with usage rules and measured contrast ratios |
| `index-ar.html` | RTL reference, showing the mirrored layout |
| `assets/` | Logo in obsidian, champagne, and ivory; the compact cut; favicon |

## How to use it

The two reference pages inline their CSS so they open straight from disk with no server. They are
not a starter template to extend — extract the CSS into a shared stylesheet built from `tokens.css`,
then rebuild the pages in whatever stack you are using.

The copy in `index.html` is written, approved in substance, and should be carried across rather than
replaced with lorem ipsum. Where the client still has to decide something, `SPEC.md` marks it
**[client to confirm]**.

## Three things that are easy to get wrong

1. **The two accents never swap.** Bronze on light, champagne on dark. Champagne on ivory measures
   1.47:1 and cannot carry text.
2. **Cormorant Garamond is a display face.** Never below 20px. Montserrat carries everything a
   person actually reads.
3. **No third-party scripts.** The client is a cybersecurity advisory firm; a tag manager or chat
   widget on this site is a credibility problem, not a convenience. See the security section of the
   spec.

## Fonts

Cormorant Garamond and Montserrat, both free from Google Fonts. The reference pages link them from
Google for convenience; self-hosting as subset WOFF2 is preferred for the real build, and removes a
third-party request.
