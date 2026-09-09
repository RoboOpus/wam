# RoboOpus WAM contributor rules

## Scope

- This repository is the `RoboOpus/wam` GitHub Pages project site.
- Never create, modify, publish, or configure `RoboOpus/RoboOpus.github.io` from this repository.
- Keep production URLs under `https://roboopus.github.io/wam/` and keep all public links/assets under the `/wam` project path.

## Content integrity

- Prefer arXiv/venue pages, official project pages, and official code repositories as factual sources.
- Treat awesome lists, interviews, social posts, and generated summaries as discovery or commentary sources.
- Label preprints, author-reported metrics, editor judgments, and reproduction status explicitly.
- Do not claim `reproduced` until code has actually run and the environment, checkpoint, benchmark, and result are recorded.
- Do not copy paper text, third-party images, or website code unless its license and attribution permit that reuse.
- Keep private ideas, cookies, credentials, raw logged-in page captures, and private PDFs out of the public repository.

## Change workflow

- Keep source URLs and paper versions visible on every paper page.
- New automated discoveries begin as candidates; automated jobs must not silently publish them as reviewed facts.
- Run `npm run lint` and `npm run build` before publishing.
- Verify homepage and paper-detail routes under `/wam/` after changing routing or assets.
