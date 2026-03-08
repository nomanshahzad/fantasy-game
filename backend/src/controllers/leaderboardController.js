const LeaderboardModel = require('../models/leaderboardModel');

const LeaderboardController = {
  getOverall: async (req, res, next) => {
    try {
      const { data, error } = await LeaderboardModel.getOverall();
      if (error) throw error;
      res.json({ leaderboard: data });
    } catch (err) {
      next(err);
    }
  },

  getMatchScores: async (req, res, next) => {
    try {
      const { data, error } = await LeaderboardModel.getMatchScores(req.params.matchId);
      if (error) throw error;
      res.json({ scores: data });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = LeaderboardController;
