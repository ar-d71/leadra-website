# Leadra — independent executive advisory

Bilingual static website, redesigned September 20, 2026. No build step or framework.

## Preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` in this directory, then open `http://127.0.0.1:8765/index-ar.html` (Arabic) or `index.html` (English).

## Files

- `index-ar.html` / `index.html`: complete homepages with real project service descriptions.
- `site.css` / `site.js`: shared responsive styles and progressive interactions.
- `tokens.css` / `tokens.json`: current design tokens.
- `styleguide.html`: current visual reference.
- `assets/editorial/`: three generated text-free WebP compositions.
- `assets/fonts/`: locally served Arabic and Latin WOFF2 subsets.
- `DESIGN-NOTES.md`: business interpretation, decisions, image prompts and validation.

## Publishing

Compatible with the existing GitHub Pages project path. Links are relative. Publish only this website directory; the outer project's legal documents must remain private. Production publishing uses the main branch of ar-d71/leadra-website.

## Contact behaviour

The form prepares a `mailto:` draft for the visitor to send in their own email app. It validates required fields and email syntax, and offers a copyable draft if the email app does not open. It does not submit data to a server or claim that a message has been sent. A backend is needed if direct form submission is desired later.

## Motion and accessibility

Native scroll; a bounded hero parallax; sequential entrance; section reveals; a scroll-linked sticky practice compass; a scroll-linked journey line. Includes an explicit pause control and respects system reduced-motion. Always-visible practice articles, labelled fields, keyboard focus and a skip link. Core content remains available without JavaScript.

## Project scope

The user confirmed the existing board/advisory business positioning and explicitly requested the black/gold photographic redesign. This supersedes the old visual restrictions in `SPEC.md`; the business scope and independence remain. Missing articles and unknown partner biographies are not fabricated.
