const express = require('express');
const router = express.Router();
const LeaderboardController = require('../controllers/leaderboardController');

router.get('/', LeaderboardController.getOverall);
router.get('/match/:matchId', LeaderboardController.getMatchScores);

module.exports = router;
