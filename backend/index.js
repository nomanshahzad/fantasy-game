const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Fantasy Sports API is running!' });
});

// Users route
app.get('/users', (req, res) => {
  res.json({ message: 'Users route working', users: [] });
});

// Teams route
app.get('/teams', (req, res) => {
  res.json({ message: 'Teams route working', teams: [] });
});

// Players route
app.get('/players', (req, res) => {
  res.json({ message: 'Players route working', players: [] });
});

// Leaderboard route
app.get('/leaderboard', (req, res) => {
  res.json({ message: 'Leaderboard route working', leaderboard: [] });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
