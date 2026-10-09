# Handoff update — Caster.fm connected

The live Caster.fm embed is now active on Home and Live. Preserve this integration rather than reverting to the old demo audio player. No AzuraCast stream/API setup is needed for the current widget. WhatsApp/GA and programme information still need final configuration. Read the current-integration section of README.md first. The older instructions below remain useful for GitHub/Vercel setup, but any instruction to keep radio in demo mode or test native-player quality preferences is superseded.

# Windows → GitHub → Claude Desktop → Vercel

## Decisions
- GitHub repository: `360-yield-radio-ghana`, public.
- Work in Claude Desktop's Code tab on Windows.
- Keep radio, WhatsApp and analytics in demo/unconfigured mode for now.
- Do not provision or purchase AzuraCast infrastructure.
- Actual logo application and the role of Royal Roots Studio remain unconfirmed.

## 1. Create the repository

Visit https://github.com/new while signed in. Name the repository `360-yield-radio-ghana`, choose Public, and leave README, .gitignore and license initialization unchecked: this project already contains the first two. Create the repository.

## 2. Upload with GitHub Desktop

GitHub Desktop is separate from Claude Desktop. Install GitHub Desktop from https://desktop.github.com/ and sign in. Choose File → Clone repository, select the empty repository, and clone it to a local folder.

Extract the supplied ZIP to a separate location. Copy everything INSIDE its `360-yield-radio-ghana` folder into the cloned repository folder, including `.gitignore` and `.env.example`. `package.json` and `CLAUDE.md` must be directly inside the cloned repository, not nested one level deeper. Do not remove the repository's `.git` directory.

In GitHub Desktop review the Changes list. There should be no `.env.local`, access tokens, node_modules, uploads, or personal screenshots. Commit with a message such as `Add radio website MVP`, then click Publish branch / Push origin, whichever is offered. Use View on GitHub to confirm the files are uploaded.

The source archive intentionally excludes local settings, generated outputs, screenshots and supplied personal images. The public source still includes all application code and placeholder configuration.

## 3. Open Claude Desktop

Use the Code tab, choose Local, and select the cloned repository folder. If the Code tab is unavailable, check that the app is current and your account supports Claude Code. Windows local sessions may require Git for Windows; install it from https://git-scm.com/downloads/win if prompted. Use the real project folder, not an ordinary chat attachment.

This Next.js project needs a supported Node.js LTS runtime to build and run. Node.js is a project dependency, not a prerequisite for merely opening the Code tab. Ask Claude to verify the installed version first.

Paste the prompt below.

## Starter prompt for Claude Code

Read CLAUDE.md, README.md and HANDOFF.md first. This is an existing Next.js radio website: do not rebuild or redesign it. Inspect the repository and explain your plan before making changes.

1. Verify Node.js, npm and Git. Install dependencies with npm ci, copy .env.example to .env.local if absent, run npm run lint and npm run build, then run the local preview.
2. Keep the stream, AzuraCast, WhatsApp and GA placeholders in demo mode. Never pretend audio is playing, invent credentials, or purchase streaming infrastructure.
3. Verify git remote origin and repository visibility. Keep .env.local, .vercel, generated output, credentials and uploaded personal images out of commits. Ask before pushing changes.
4. Check which GitHub/Vercel tools or MCP integrations are actually available in this Code session. Do not assume Chat connectors automatically carry over to Code. If an integration is absent, explain the official authentication flow; never ask me to paste tokens into chat or commit them.
5. Review dependency/security warnings before public deployment. Explain necessary updates and preserve current behaviour. Do not claim a Lighthouse score without measuring it.
6. Help me import this GitHub repository into my Vercel account with the Next.js preset. Keep placeholder demo mode for now. Ask me to approve the target account/project before deploying. The normal Vercel GitHub import workflow is sufficient if no connector is available.
7. Verify the deployed URL, all six pages, demo playback notice, mobile layout, PWA behaviour and quality preference persistence. List any checks you could not perform.

Do not publish, delete resources, buy services, or change branding without asking me first.

## 4. Publish with Vercel

In Vercel choose Add New → Project, authorize GitHub for this repository, and import `360-yield-radio-ghana`. Use the Next.js framework preset and the repository root directory. No production credentials are needed to deploy the current demo: the app tolerates missing environment variables.

Review settings before clicking Deploy. Once production stream URLs arrive, add public configuration values in Vercel's environment settings and redeploy; NEXT_PUBLIC values are baked into the build. AzuraCast is a separate hosted service, not something Vercel supplies.

## Important

A public repository exposes its committed contents to everyone. A .gitignore prevents future accidental additions; it does not erase secrets already committed. If a secret is ever committed, revoke/rotate it and follow GitHub's sensitive-data removal guidance.

This package does not create your GitHub repository or deploy your Vercel project. Those actions require authentication and your approval.
