const TeamModel = require('../models/teamModel');

const TeamController = {
  getAll: async (req, res, next) => {
    try {
      const { data, error } = await TeamModel.getAll();
      if (error) throw error;
      res.json({ teams: data });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { data, error } = await TeamModel.getById(req.params.id);
      if (error) throw error;
      if (!data) return res.status(404).json({ message: 'Team not found' });
      res.json({ team: data });
    } catch (err) {
      next(err);
    }
  },

  getTeamPlayers: async (req, res, next) => {
    try {
      const { data, error } = await TeamModel.getTeamPlayers(req.params.id);
      if (error) throw error;
      res.json({ players: data });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = TeamController;
