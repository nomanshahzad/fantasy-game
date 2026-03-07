require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const supabase = require('./database/schema');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base route - test Supabase connection
app.get('/', async (req, res) => {
  const { data, error } = await supabase.from('users').select('count');
  if (error && error.code !== 'PGRST116') {
    return res.json({ message: 'Fantasy Sports API is running!', db: 'connection error', error: error.message });
  }
  res.json({ message: 'Fantasy Sports API is running!', db: 'connected' });
});

// Users route
app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json({ users: data });
});

// Teams route
app.get('/teams', async (req, res) => {
  const { data, error } = await supabase.from('fantasy_teams').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json({ teams: data });
});

// Players route
app.get('/players', async (req, res) => {
  const { data, error } = await supabase.from('players').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json({ players: data });
});

// Leaderboard route
app.get('/leaderboard', async (req, res) => {
  const { data, error } = await supabase.from('users').select('username, total_points').order('total_points', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ leaderboard: data });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
