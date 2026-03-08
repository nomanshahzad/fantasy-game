const PlayerModel = require('../models/playerModel');

const PlayerController = {
  getAll: async (req, res, next) => {
    try {
      const { role } = req.query;
      const { data, error } = role
        ? await PlayerModel.getByRole(role)
        : await PlayerModel.getAll();
      if (error) throw error;
      res.json({ players: data });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { data, error } = await PlayerModel.getById(req.params.id);
      if (error) throw error;
      if (!data) return res.status(404).json({ message: 'Player not found' });
      res.json({ player: data });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = PlayerController;
