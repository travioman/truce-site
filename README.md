# truce-site

Static site for Truce Games and OurPlace. Plain HTML, no build step.

## Hosting

- Cloudflare Workers (static assets only), Worker name `truce-site`.
- Connected to this GitHub repo: every push to `main` deploys.
- `wrangler.jsonc` publishes **only `public/`**. Anything outside it (README, `.git`, config) is never served.
- Unknown URLs get `public/404.html`.
- Live at `truce-site.email-truce-games.workers.dev`. `truce.games` is not connected yet (its DNS is still at GoDaddy).
- `CNAME` and `.nojekyll` are leftovers from the old GitHub Pages setup; they are not served.

## Pages (all in `public/`)

- `/` studio home
- `/ourplace/` game page (store buttons appear once their `href` is set)
- `/privacy/` privacy policy (store and Google verification URL)
- `/join/` Quick Join invite landing page (`/join/#CODE`)
- `/support/` support and bug contact

## Notes

- One stylesheet: `public/style.css` (light + dark). Font: Nunito Sans (OFL, `public/assets/fonts/`), same as the app.
- Support email is the interim `email.truce.games@gmail.com` until truce.games has mail.
- `privacy/` and `join/` started as copies of `web/` in the OurPlace repo. OurPlace sessions still edit `web/privacy.html` there: after a privacy change, copy only the policy text (inside `<article>`) here; keep this site's header, footer and stylesheet.
