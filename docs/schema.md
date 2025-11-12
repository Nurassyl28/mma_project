# Database Schema

- **DDL**: `db/schema.sql` bootstraps PostgreSQL with `pgcrypto`, UUID primary keys, and supporting indexes for event lookups (`events_date_idx`), fight history (`fights_finalized_idx`), and ranking calculations (`rankings_wc_points_idx`).
- **ERD**: see `docs/ERD.md` for the entity relationship diagram rendered with Mermaid.
- **Migrations**: use `npm run migration:gen` and `npm run migration:run` to keep the schema in sync with the TypeORM entities.

Apply the schema locally:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

The script is idempotent, so it is safe to re-run when bootstrapping new environments.
