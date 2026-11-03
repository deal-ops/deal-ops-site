# Deal Ops website

The public website of Deal Ops, open-source tools for SPV and syndicate deal operations: https://deal-ops-toolkit-site.vercel.app

Static pages (`site/`: the overview `/`, `/toolkit/` and `/inbox/`) with one small script (`site-src/site.js`, built to `site/site.js`). `/inbox/demo/` is the Deal Ops Inbox demo package from its GitHub Release, unpacked as published and locked by hash in `inbox-demo.lock` (`scripts/inbox-demo.mjs`). No analytics, no external requests; the security headers are in `site/vercel.json`. Design, components and checks are described in `docs/en/SITE_HANDBOOK.md`.

```bash
npm ci
npm run toolkit:fetch   # the public Toolkit repo at the commit in toolkit.ref (the pages quote the app word for word)
npm run inbox:fetch     # the public Inbox repo at the commit in inbox.ref (release notes, UI text, default categories)
npm run site:check      # CSP markup, links, app sentences, figures backed by release notes, demo package hashes, script build and size, source-backed step illustrations
npm run site:preview    # http://localhost:4181 with the production headers and redirects
```

Licence: Apache-2.0 (code). Fonts: SIL OFL 1.1 (`site/licenses/`).
