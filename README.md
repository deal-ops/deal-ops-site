# Deal Ops website

The public website of Deal Ops, open-source tools for SPV and syndicate deal operations: https://deal-ops-toolkit-site.vercel.app

A static page (`site/`) with one small script (`site-src/site.js`, built to `site/site.js`). No analytics, no external requests; the security headers are in `site/vercel.json`. Design, components and checks are described in `docs/en/SITE_HANDBOOK.md`.

```bash
npm ci
npm run toolkit:fetch   # the public Toolkit repo at the commit in toolkit.ref (the page quotes the app word for word)
npm run site:check      # CSP markup, links, app sentences, figures backed by release notes, script build and size, clip length
npm run site:preview    # http://localhost:4180 with the production headers
```

Licence: Apache-2.0 (code). Fonts: SIL OFL 1.1 (`site/licenses/`).
