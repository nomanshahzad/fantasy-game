-- Users table
CREATE TABLE IF NOT EXISTS users (
  user_id       SERIAL PRIMARY KEY,
  auth_id       TEXT UNIQUE,
  username      TEXT NOT NULL UNIQUE,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL DEFAULT 'managed_by_supabase',
  is_admin      BOOLEAN NOT NULL DEFAULT FALSE,
  transfers_used INTEGER NOT NULL DEFAULT 0,
  total_points  REAL NOT NULL DEFAULT 0,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- Players table (real cricket players)
CREATE TABLE IF NOT EXISTS players (
  player_id   SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL CHECK(role IN ('batsman', 'bowler', 'all-rounder', 'wicket-keeper')),
  real_team   TEXT NOT NULL,
  credit_cost REAL NOT NULL DEFAULT 8.0,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

-- Fantasy teams table (one per user)
CREATE TABLE IF NOT EXISTS fantasy_teams (
  team_id      SERIAL PRIMARY KEY,
  user_id      INTEGER NOT NULL UNIQUE REFERENCES users(user_id),
  team_name    TEXT NOT NULL,
  total_points REAL NOT NULL DEFAULT 0,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Fantasy team players (11 players per team)
CREATE TABLE IF NOT EXISTS fantasy_team_players (
  id              SERIAL PRIMARY KEY,
  team_id         INTEGER NOT NULL REFERENCES fantasy_teams(team_id),
  player_id       INTEGER NOT NULL REFERENCES players(player_id),
  is_captain      BOOLEAN NOT NULL DEFAULT FALSE,
  is_vice_captain BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE(team_id, player_id)
);

-- Match schedule
CREATE TABLE IF NOT EXISTS match_schedule (
  match_id   SERIAL PRIMARY KEY,
  team1      TEXT NOT NULL,
  team2      TEXT NOT NULL,
  venue      TEXT,
  match_date TIMESTAMP NOT NULL,
  status     TEXT NOT NULL DEFAULT 'upcoming' CHECK(status IN ('upcoming', 'live', 'completed'))
);

-- Scores (player performance per match)
CREATE TABLE IF NOT EXISTS scores (
  score_id       SERIAL PRIMARY KEY,
  match_id       INTEGER NOT NULL REFERENCES match_schedule(match_id),
  player_id      INTEGER NOT NULL REFERENCES players(player_id),
  runs_scored    INTEGER NOT NULL DEFAULT 0,
  wickets_taken  INTEGER NOT NULL DEFAULT 0,
  catches        INTEGER NOT NULL DEFAULT 0,
  stumpings      INTEGER NOT NULL DEFAULT 0,
  fantasy_points REAL NOT NULL DEFAULT 0,
  UNIQUE(match_id, player_id)
);

-- Transfers log
CREATE TABLE IF NOT EXISTS transfers (
  transfer_id    SERIAL PRIMARY KEY,
  user_id        INTEGER NOT NULL REFERENCES users(user_id),
  player_out_id  INTEGER NOT NULL REFERENCES players(player_id),
  player_in_id   INTEGER NOT NULL REFERENCES players(player_id),
  transferred_at TIMESTAMP DEFAULT NOW()
);
