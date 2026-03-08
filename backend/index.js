require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');
const playerRoutes = require('./src/routes/playerRoutes');
const teamRoutes = require('./src/routes/teamRoutes');
const leaderboardRoutes = require('./src/routes/leaderboardRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Fantasy Sports API is running!' });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
