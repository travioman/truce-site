# truce-site

Static site for Truce Games and OurPlace. Plain HTML, no build step.
Hosted on Cloudflare Pages (connected to this repo; every push deploys; no build command) at `truce.games`. `CNAME` is only for the old GitHub Pages setup.

## Pages

- `/` studio home
- `/ourplace/` game page (store buttons appear once their `href` is set)
- `/privacy/` privacy policy (store and Google verification URL)
- `/join/` Quick Join invite landing page (`/join/#CODE`)
- `/support/` support and bug contact

## Notes

- Support email is the interim `email.truce.games@gmail.com` until truce.games has mail.
- `privacy/` and `join/` started as copies of `web/` in the OurPlace repo; OurPlace sessions still edit `web/privacy.html` there, so copy it here after any privacy change (synced 2026-10-21).
- Domain: `truce.games` points at Cloudflare (its nameservers); `www` redirects to the bare domain. Links are root-relative.
