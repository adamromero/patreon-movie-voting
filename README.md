# Patreon Movie Voting

A [Next.js](https://nextjs.org/) app for a Patreon-backed channel: patrons browse and request movies and shows (via [The Movie Database](https://www.themoviedb.org/) metadata), vote on the backlog, and track monthly request limits. The channel creator can manage request status, holiday tags, and Patreon/YouTube links.

## Features

- **Patreon sign-in** via [NextAuth.js](https://next-auth.js.org/) with the Patreon provider; sessions use JWT while accounts are stored with the MongoDB adapter.
- **Access control** — only active patrons of a configured campaign can use the app; others are sent to `/unauthorized`. The creator account and an optional dev user ID can bypass tier checks where the code allows it.
- **Tiers** — standard vs producer Patreon tiers drive monthly “new request” limits; patrons who have requests marked “seen” in a month can earn extra slots for that month.
- **Backlog** — filter, sort, and paginate requests; vote, reaction/seen flags, rewatch and seasonal (Halloween/Christmas) metadata; unique constraint on `imdbID` in MongoDB.
- **Creator tools** — update status, set links, and related fields through the UI and API routes.
- **Webhook** — `POST /api/patreon/webhook` integrates with external automation (for example, marking a title as on-channel).

## Tech stack

| Area       | Choice                                                                             |
| ---------- | ---------------------------------------------------------------------------------- |
| Framework  | Next.js 14 (App Router), React 18, TypeScript                                      |
| Styling    | Tailwind CSS                                                                       |
| Data       | MongoDB ([Mongoose](https://mongoosejs.com/) models, `@next-auth/mongodb-adapter`) |
| Auth       | NextAuth.js + Patreon OAuth                                                        |
| Movie data | TMDB API                                                                           |
| Tests      | Jest, ts-jest                                                                      |

## Prerequisites

- Node.js (LTS recommended) and npm
- A MongoDB deployment (connection string compatible with the drivers used here)
- A [Patreon API client](https://www.patreon.com/portal/registration/register-clients) (client ID and secret)
- A [TMDB API key](https://developer.themoviedb.org/docs/getting-started)

## Environment variables

Create `.env.local` in the project root (never commit secrets). Typical variables:

| Variable                | Purpose                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| `MONGODB_URI`           | MongoDB connection string (used for Mongoose and the NextAuth adapter)                           |
| `NEXTAUTH_SECRET`       | Secret for signing JWTs ([generate](https://generate-secret.vercel.app/32) a strong value)       |
| `NEXTAUTH_URL`          | Public site URL (for example `http://localhost:3000` locally, your production URL when deployed) |
| `PATREON_CLIENT_ID`     | Patreon OAuth client ID                                                                          |
| `PATREON_CLIENT_SECRET` | Patreon OAuth client secret                                                                      |
| `PATREON_PROFILE_URL`   | Patreon API URL used in the sign-in callback to verify membership (campaign pledge)              |
| `CAMPAIGN_ID`           | Patreon campaign ID — only active patrons of this campaign are authorized                        |
| `CREATOR_ID`            | Patreon user ID for the channel owner (full app access, bypasses pledge check on sign-in)        |
| `PRODUCER_TIER_ID`      | Patreon tier ID for the “producer” tier (higher monthly request limit)                           |
| `DEV_ID`                | Optional Patreon user ID treated like producer in session (local/staging convenience)            |
| `TMDB_API_KEY`          | The Movie Database API key for search and metadata                                               |

Configure your Patreon app’s redirect URI to match NextAuth (for example `https://your-domain.com/api/auth/callback/patreon` and the same path on `localhost` for development).

## Local development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Ensure `.env.local` is complete; without MongoDB and auth env vars, sign-in and data features will not work.

### Other scripts

```bash
npm run build   # production build
npm run start   # run production server (after build)
npm run lint    # Next.js ESLint
npm run test    # Jest unit tests
```

## Project layout (high level)

- `app/` — App Router pages, API routes (`app/api/...`), and UI components
- `context/` — movie list state and server actions
- `lib/` — database helpers, TMDB client, request services, session helpers
- `models/` — Mongoose schemas

## Deployment

Deploy like any Next.js app (for example [Vercel](https://vercel.com/)): set the same environment variables in the host’s dashboard, point `NEXTAUTH_URL` at the production domain, and add the production callback URL in the Patreon client settings.

## License

Private project (`"private": true` in `package.json`). Adjust this section if you open-source the repo.
