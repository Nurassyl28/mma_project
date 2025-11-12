CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS fighters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  nickname text,
  weight_class text NOT NULL,
  country text
);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  date timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date);

CREATE TABLE IF NOT EXISTS fights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  red_fighter_id uuid NOT NULL REFERENCES fighters(id),
  blue_fighter_id uuid NOT NULL REFERENCES fighters(id),
  winner_id uuid REFERENCES fighters(id),
  method text,
  round int,
  time text,
  is_finalized boolean NOT NULL DEFAULT false,
  weight_class text NOT NULL
);
CREATE INDEX IF NOT EXISTS fights_weight_idx ON fights(weight_class);
CREATE INDEX IF NOT EXISTS fights_finalized_idx ON fights(is_finalized, event_id);

CREATE TABLE IF NOT EXISTS rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fighter_id uuid NOT NULL REFERENCES fighters(id),
  weight_class text NOT NULL,
  points int NOT NULL DEFAULT 0,
  wins int NOT NULL DEFAULT 0,
  losses int NOT NULL DEFAULT 0,
  draws int NOT NULL DEFAULT 0,
  rank int NOT NULL DEFAULT 0,
  last_activity timestamptz
);
CREATE INDEX IF NOT EXISTS rankings_wc_points_idx ON rankings(weight_class, points DESC);
