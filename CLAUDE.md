# 360 Yield Radio Ghana — project guide

See README.md for setup, integration details and launch checks.

- Next.js 14 App Router, TypeScript in src/, Tailwind CSS, next-pwa.
- Mobile-first at 360–414px, dark background, red primary, warm Ghanaian tone.
- Keep the audio element in the root PlayerProvider; use Next Link so route navigation does not interrupt it.
- Stream URLs and the public AzuraCast endpoint are environment configuration. Never fake playback or live listener numbers in demo mode.
- Use Africa/Accra for schedules. Real AutoDJ runs on AzuraCast, never in the Next.js app.
- Do not cache audio or remote APIs. Keep pages and local static assets available offline after caching.
- Use SVG/CSS artwork; real images should use next/image.
- Keep bundles lean. No Redux, Zustand, CMS, accounts, donations, ads or podcasts for this MVP.
- Ask for production stream URLs before live-stream tests and transparent PNG/SVG/512px brand assets before replacing the temporary logo.

## Active player update
The site now uses the official Caster.fm live widget on Home and Live. See the current-integration section of README.md. Do not restore the demo native player or AzuraCast polling automatically. The old hooks are retained but inactive. On-demand content is not enabled. The widget remounts on page navigation; use its separate-tab link for uninterrupted browsing. Preserve vendor attribution links and public embed identifiers. Never infer playback state from the decorative record or claim a bitrate that the provider has not reported.
