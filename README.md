# Current integration: Caster.fm live player

The Home and Live pages now use the supplied official Caster.fm `newStreamPlayer` widget. The previous AzuraCast setup below is retained as historical guidance for an optional future migration, not the active player.

- Public token and channel ID are in `public/caster-player.html`. These are public embed identifiers, not private credentials.
- The supplied light theme and `e81e4d` accent are preserved, as are all three required Caster.fm attribution links.
- `public/caster-player.html` isolates the vendor script from React lifecycle changes. `public/caster-player.js` reports its size to `CasterPlayer.tsx`, which validates the message origin and source. Each page navigation starts a fresh widget.
- Caster.fm controls playback, stream status and metadata. The old native audio provider and AzuraCast polling are not mounted. Existing stream/API environment variables are not used by this embed.
- Listen Live links navigate to the real widget controls. There is no supported cross-origin remote Play API assumed by this integration.
- Playback stops when navigating away from a page containing the widget. Use “Open player in a new tab” to keep listening while browsing. Persistent in-page Caster.fm playback is not implemented.
- The native 48/128 kbps toggle was removed: the widget determines available playback quality. Its external JavaScript/media downloads are additional to Next.js bundle sizes.
- The podcasts/on-demand embed is intentionally not added. Show schedules, WhatsApp and branding remain as previously configured/demo.
- Offline pages cannot play live radio; Caster.fm scripts and media are network resources and are not cached by our service worker.
- Validation: production build and TypeScript passed. Caster.fm iframe mounted on Home and Live at 360, 390, 414 and 1440px without page overflow or runtime errors; route return and reload passed. A Play click produced an audio element with paused=false, readyState=3, no media error, and PAUSE displayed. This verifies browser playback started, not subjective audio quality or Android background behavior.
- Run `npm ci`, `npm run build`, then `npm start`. For development use `npm run dev`. `checks/caster.cjs` is the current optional Playwright smoke test; `checks/browser.cjs` describes the older native-player demo and is superseded.
- For GitHub/Vercel use the updated source archive. No external repository push or deployment has been performed here.

---

## Historical native-player setup (inactive with Caster.fm)

# 360 Yield Radio Ghana

A lightweight, mobile-first Next.js 14 / TypeScript / Tailwind radio website and PWA. All six routes are implemented. No login, CMS, payments or replay features are included.

## Run

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Production: `npm run build && npm start`. Service workers are deliberately disabled in development. The preview uses a production build.

## Connect the station

Replace the placeholder values in `.env.local` (or in Vercel project settings), then rebuild:

- `NEXT_PUBLIC_STREAM_URL_LOW`: direct HTTPS 48 kbps AAC+ mount
- `NEXT_PUBLIC_STREAM_URL_HIGH`: direct HTTPS 128 kbps MP3 mount
- `NEXT_PUBLIC_AZURACAST_API_URL`: public station now-playing endpoint
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: digits only, international format, e.g. starts with `233`; no plus sign or spaces
- `NEXT_PUBLIC_GA_ID`: your real `G-…` property ID. Placeholder IDs do not load Google Analytics.

All `NEXT_PUBLIC_` settings are public, build-time values. Never place private API keys here. The public Now Playing endpoint must allow requests from the site origin through its CORS policy. Only HTTPS streams work reliably on an HTTPS website.

No stream playback is simulated. Missing/placeholder streams show a friendly notice. Metadata, presenters and schedules are explicitly demo content. An unconfigured WhatsApp button leads to an explanatory contact page, never to an invalid phone number. Add the real email/social URLs in `src/app/contact/page.tsx` before launch.

## Audio and schedule

- A single HTML audio element lives in the root `PlayerProvider` and survives client-side route changes. Stream quality persists in localStorage. Navigation uses Next.js links; a full browser refresh will naturally stop audio.
- User interaction is required to start playback. Android browser/OS restrictions can still affect background audio; test on the target devices with the real streams.
- Audio supports buffering, errors, retry through Play, pause, volume and quality switches that resume playback when appropriate.
- `useNowPlaying` polls every 15 seconds while the page is visible, aborts timed-out requests and retains last-known metadata on failure.
- The `live.is_live` field denotes a human presenter; AutoDJ is displayed as “ON AIR”, not “LIVE”.
- **AutoDJ is configured in AzuraCast, not on Vercel.** Set playlists, fallback behavior, station timezone, and both low/high mounts there. The site consumes the resulting continuous streams.
- Edit `src/data/schedule.ts` to set the real lineup. Time comparisons use Africa/Accra explicitly. The schedule label describes what is scheduled, not independently verified broadcasting activity.

## Branding and PWA

The typographic logo and generated local app icons are temporary. Supply transparent PNG and SVG logo files plus a 512×512 icon. Red defaults to `#fa333a`; the PWA theme follows the brief's `#ff0000`.

Inter is served as one local 48 kB Latin variable WOFF2 file from Google Fonts (SIL Open Font License). No external font request or above-the-fold image download is required. Decorative vinyl and show artwork are CSS, with reduced-motion support.

`next-pwa` caches the static shell and same-origin visited pages/assets. Unvisited pages are not guaranteed available offline. Audio and remote API responses are **not** cached. A browser install prompt is offered after 30 seconds only when the browser reports installation eligibility. It must be tested on the HTTPS deployment in a top-level tab (embedded previews may not expose installation).

## Deploy to Vercel

1. Push the project to a Git repository, excluding `.env.local`, `.next`, `node_modules`, generated service-worker files and local check screenshots.
2. Import it into Vercel using the Next.js preset.
3. Add the five real environment variables, then deploy.
4. Verify both quality mounts, artist/title updates, AutoDJ-to-live transitions, WhatsApp messages, persistent playback across links, and Android installation.
5. Run Lighthouse against the deployed production URL with the real integrations. The build's first-load JS estimate is around 100 kB; this is not a measured Lighthouse score.

No external deployment has been made by this build. Vercel hosting and AzuraCast streaming are separate services; the free website tier does not host or pay for the radio stream.

## Validation

- `npm run lint`: TypeScript checking.
- `npm run build`: production compilation and static generation of all routes.
- A local Playwright smoke test (`checks/browser.cjs`) checks all six routes at 360, 390 and 414 pixels, absence of horizontal overflow/runtime errors, the placeholder stream notice, persisted quality choice, and Sunday schedule switching. To rerun, install Playwright separately and its Chromium dependencies, start the production server on port 3000, then run `node checks/browser.cjs`.
- Real stream playback, API CORS, background Android audio, OS installation, GA collection and a Lighthouse 90+ score still require launch configuration and deployed-device testing.
