# MMA Backend (NestJS + TypeORM + GraphQL)

## Stack
- NestJS
- TypeORM + PostgreSQL
- GraphQL (code-first)
- BullMQ + Redis for background ranking recompute

## Run
```bash
npm i
cp .env.example .env
# offline/dev mode (pure JS, in-memory DB + no Redis)
DB_MODE=memory ENABLE_RANKING_QUEUE=false npm run start:dev
# full stack (Postgres + Redis via docker-compose)
docker-compose up -d
npm run migration:run
# or rely on TypeORM synchronize for quick local protos
DB_SYNCHRONIZE=true ENABLE_RANKING_QUEUE=true npm run start:dev
ENABLE_RANKING_QUEUE=true npm run start:dev
# GraphQL Playground at http://localhost:3000/graphql
```
Set `DB_MODE=postgres` when targeting a real Postgres instance; the fallback `memory` mode keeps everything in-process for constrained environments. `db/schema.sql` + `docs/schema.md` describe the schema, while `docs/ERD.md` contains the ERD.

## GraphQL API
- `events` – all events with fights (admin tooling).
- `upcomingEvents(limit)` – events with `date >= now`, ordered ASC.
- `history(limit)` – finalized fights ordered by event date DESC.
- `fighters` / `fighter(slug)` – roster queries.
- `rankings(weightClass)` – sorted rankings per weight class.
- Mutations: `createEvent`, `createFight`, `reportFightResult`, `createFighter`.

## Ranking recompute
- `FightsService.reportResult` enqueues a `ranking` BullMQ job whenever a fight is finalized.
- Queue is gated by `ENABLE_RANKING_QUEUE`. When `false`, recomputes are skipped with a log message (useful for dev environments).
- `RankingProcessor` aggregates finalized fights per weight class, assigns points (KO/Sub = 4, Decision = 3, Draw = 1, Loss = 0), uses win% and last activity as tie-breakers, and persists the ordered rank.
- Background worker requires Redis (see `docker-compose.yml`).

## Data model
- PostgreSQL-first, UUID PKs via `pgcrypto`. For local/offline runs use `DB_MODE=memory`.
- `DB_SYNCHRONIZE=true` lets TypeORM auto-create tables in dev; otherwise run migrations/schema manually.
- Schema + indexes live in `db/schema.sql`; ERD lives in `docs/ERD.md`.
- Generate new migrations with `npm run migration:gen`.
