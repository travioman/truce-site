# truce-site

Static site for Truce Games and OurPlace. Plain HTML, no build step.
Hosted on GitHub Pages; `CNAME` holds the domain.

## Pages

- `/` studio home
- `/ourplace/` game page (store buttons appear once their `href` is set)
- `/privacy/` privacy policy (store and Google verification URL)
- `/join/` Quick Join invite landing page (`/join/#CODE`)
- `/support/` support and bug contact

## Notes

- Support email is the interim `email.truce.games@gmail.com` until truce.games has mail.
- `privacy/` and `join/` started as copies of `web/` in the OurPlace repo. This repo is now their home; edit them here.
- Moving to the bare `truce.games` later = change `CNAME` and the GoDaddy records. Links are root-relative, so nothing else changes.
