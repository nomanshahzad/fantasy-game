const UserModel = require('../models/userModel');

const UserController = {
  getAll: async (req, res, next) => {
    try {
      const { data, error } = await UserModel.getAll();
      if (error) throw error;
      res.json({ users: data });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { data, error } = await UserModel.getById(req.params.id);
      if (error) throw error;
      if (!data) return res.status(404).json({ message: 'User not found' });
      res.json({ user: data });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UserController;
