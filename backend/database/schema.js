const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'fantasy.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// ─── USERS ───────────────────────────────────────────────────────────────────
// Stores registered users (players in the fantasy game)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    user_id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    NOT NULL UNIQUE,
    email         TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    is_admin      INTEGER NOT NULL DEFAULT 0,
    transfers_used INTEGER NOT NULL DEFAULT 0,
    total_points  REAL    NOT NULL DEFAULT 0,
    created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
  );
`);

// ─── PLAYERS ─────────────────────────────────────────────────────────────────
// Real-world cricket players available for selection
db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    player_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    role        TEXT    NOT NULL CHECK(role IN ('batsman', 'bowler', 'all-rounder', 'wicket-keeper')),
    real_team   TEXT    NOT NULL,
    credit_cost REAL    NOT NULL DEFAULT 8.0,
    is_active   INTEGER NOT NULL DEFAULT 1
  );
`);

// ─── FANTASY TEAMS ────────────────────────────────────────────────────────────
// Each user has one fantasy team for the season
db.exec(`
  CREATE TABLE IF NOT EXISTS fantasy_teams (
    team_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL UNIQUE,
    team_name    TEXT    NOT NULL,
    total_points REAL    NOT NULL DEFAULT 0,
    created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  );
`);

// ─── FANTASY TEAM PLAYERS ────────────────────────────────────────────────────
// Which 11 players are in each fantasy team + captain/vice-captain
db.exec(`
  CREATE TABLE IF NOT EXISTS fantasy_team_players (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id         INTEGER NOT NULL,
    player_id       INTEGER NOT NULL,
    is_captain      INTEGER NOT NULL DEFAULT 0,
    is_vice_captain INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (team_id)   REFERENCES fantasy_teams(team_id),
    FOREIGN KEY (player_id) REFERENCES players(player_id),
    UNIQUE(team_id, player_id)
  );
`);

// ─── MATCH SCHEDULE ──────────────────────────────────────────────────────────
// Real-world match schedule for the season
db.exec(`
  CREATE TABLE IF NOT EXISTS match_schedule (
    match_id  INTEGER PRIMARY KEY AUTOINCREMENT,
    team1     TEXT    NOT NULL,
    team2     TEXT    NOT NULL,
    venue     TEXT,
    match_date TEXT   NOT NULL,
    status    TEXT    NOT NULL DEFAULT 'upcoming' CHECK(status IN ('upcoming', 'live', 'completed'))
  );
`);

// ─── SCORES ──────────────────────────────────────────────────────────────────
// Player performance stats per match
db.exec(`
  CREATE TABLE IF NOT EXISTS scores (
    score_id       INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id       INTEGER NOT NULL,
    player_id      INTEGER NOT NULL,
    runs_scored    INTEGER NOT NULL DEFAULT 0,
    wickets_taken  INTEGER NOT NULL DEFAULT 0,
    catches        INTEGER NOT NULL DEFAULT 0,
    stumpings      INTEGER NOT NULL DEFAULT 0,
    fantasy_points REAL    NOT NULL DEFAULT 0,
    FOREIGN KEY (match_id)  REFERENCES match_schedule(match_id),
    FOREIGN KEY (player_id) REFERENCES players(player_id),
    UNIQUE(match_id, player_id)
  );
`);

// ─── TRANSFERS ───────────────────────────────────────────────────────────────
// Log of every player transfer made by users
db.exec(`
  CREATE TABLE IF NOT EXISTS transfers (
    transfer_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id       INTEGER NOT NULL,
    player_out_id INTEGER NOT NULL,
    player_in_id  INTEGER NOT NULL,
    transferred_at TEXT   NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id)       REFERENCES users(user_id),
    FOREIGN KEY (player_out_id) REFERENCES players(player_id),
    FOREIGN KEY (player_in_id)  REFERENCES players(player_id)
  );
`);

console.log('All tables created successfully.');

module.exports = db;
