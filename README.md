# Fantasy Sports Platform

A season-long fantasy cricket platform for 20 users. Built with React, Node.js, Supabase, and Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (coming soon) |
| Real-time | Socket.io (coming soon) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render.com |

---

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com)
- A [Supabase](https://supabase.com) account (free)

---

## Local Setup

### 1. Clone the repository

```bash
git clone git@github.com:nomanshahzad/fantasy-game.git
cd fantasy-game
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
PORT=5000
```

> Get these values from your Supabase project → Settings → API Keys

Start the backend:

```bash
node index.js
```

Backend will run at: `http://localhost:5000`

### 3. Set up the Frontend

```bash
cd frontend
npm install
```

Create a `.env.development` file inside the `frontend/` folder:

```
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## Database Setup

The database is hosted on Supabase. To set it up from scratch:

1. Create a new project on [Supabase](https://supabase.com)
2. Go to **SQL Editor** in the Supabase dashboard
3. Copy the contents of `backend/database/migrations.sql`
4. Paste and run it in the SQL Editor
5. All tables will be created automatically

### Database Tables

| Table | Description |
|-------|-------------|
| `users` | Registered users with transfer count and total points |
| `players` | Real cricket players available for selection |
| `fantasy_teams` | Each user's fantasy team (one per user) |
| `fantasy_team_players` | 11 players per team with captain/vice-captain flags |
| `match_schedule` | Real-world match schedule for the season |
| `scores` | Player performance stats per match |
| `transfers` | Full log of every transfer made by users |

---

## Project Structure

```
fantasy-game/
├── backend/
│   ├── database/
│   │   ├── schema.js         # Supabase client setup
│   │   └── migrations.sql    # SQL to create all tables
│   ├── index.js              # Express server + API routes
│   ├── package.json
│   └── .env                  # (not committed) credentials
│
└── frontend/
    └── src/
        ├── components/       # Reusable UI components
        ├── pages/
        │   ├── Home.jsx
        │   ├── MyTeam.jsx
        │   └── Leaderboard.jsx
        ├── assets/           # Images and icons
        ├── App.jsx           # Routes setup
        └── main.jsx
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check + DB connection status |
| GET | `/users` | Get all users |
| GET | `/players` | Get all players |
| GET | `/teams` | Get all fantasy teams |
| GET | `/leaderboard` | Get leaderboard sorted by points |

---

## Deployment

| Service | Platform | Auto-deploy |
|---------|----------|-------------|
| Frontend | [Vercel](https://vercel.com) | Yes, on push to `main` |
| Backend | [Render.com](https://render.com) | Yes, on push to `main` |
| Database | [Supabase](https://supabase.com) | Always live |

To deploy, simply push to GitHub:

```bash
git add .
git commit -m "your message"
git push
```

Vercel and Render will automatically pick up the changes.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SECRET_KEY` | Your Supabase secret key |
| `PORT` | Port to run the server (default: 5000) |

### Frontend (`frontend/.env.development`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend URL (localhost for dev, Render URL for prod) |

---

## Contributing

1. Clone the repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Push and open a Pull Request
