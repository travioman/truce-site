# truce-site

Static site for Truce Games and OurPlace. Plain HTML, no build step.

## Hosting

- Cloudflare Workers (static assets only), Worker name `truce-site`.
- Connected to this GitHub repo: every push to `main` deploys.
- `wrangler.jsonc` publishes **only `public/`**. Anything outside it (README, `.git`, config) is never served.
- Unknown URLs get `public/404.html`.
- Live at `truce-site.email-truce-games.workers.dev`. `truce.games` DNS is on Cloudflare (2026-11-07); attach it as a Worker custom domain.
- `CNAME` and `.nojekyll` are leftovers from the old GitHub Pages setup; they are not served.

## Pages (all in `public/`)

- `/` studio home
- `/games/` all games (add a `.game` card per title)
- `/about/` the studio (nav says Studio): why Truce, the team (Travis, Victoria, Cam), how we work
- `/ourplace/` game page (store buttons appear once their `href` is set)
- `/privacy/` privacy policy (store and Google verification URL)
- `/join/` Quick Join invite landing page (`/join/#CODE`)
- `/support/` support and bug contact

## Notes

- One stylesheet: `public/style.css`. Truce brand (2026-11-08): deep teal ink + Truce teal `#80DED9`, Bebas Neue display type (echoes the wordmark; OFL, `assets/fonts/`), Geist body. Story: developers + players, same side; "Terms of the truce" (4 articles); OurPlace = Game 01 in its peach.
- Motion (2026-11-08): `assets/site.js` reveals `.reveal` sections on scroll, moves the hero glow with the pointer and shades the header. A head snippet adds `.js` and removes it after 2.5 s if site.js never ran, so content can never stay hidden. Everything stops under prefers-reduced-motion.
- Logo: `assets/truce-mark.svg` (teal + white), `truce-mark-mono.svg` and `truce-wordmark.svg` (single colour; used through CSS masks so they take the text colour: `.logo-mono`, `.wordmark`). Traced from `E:/AI/truce-games/brand` PNGs.
- OurPlace art on the site is the app icon on a peach card (2026-11-07: Travis passed on the room renders, and the site never claims anything is handmade or AI-free).
- Team avatars are initials until the portraits exist; swap in `assets/team/<name>.webp` (comment in the markup).
- Never name the day job or employer anywhere on the site (see truce-games README).
- Support email is the interim `email.truce.games@gmail.com` until truce.games has mail.
- `privacy/` and `join/` started as copies of `web/` in the OurPlace repo. OurPlace sessions still edit `web/privacy.html` there: after a privacy change, copy only the policy text (inside `<article>`) here; keep this site's header, footer and stylesheet.
