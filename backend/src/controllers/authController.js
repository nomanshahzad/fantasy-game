const AuthModel = require('../models/authModel');

const AuthController = {
  signup: async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        return res.status(400).json({ message: 'Email, password and username are required' });
      }
      const result = await AuthModel.signup({ email, password, username });
      res.status(201).json({ message: 'Account created successfully', ...result });
    } catch (err) {
      next(err);
    }
  },

  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const result = await AuthModel.signin({ email, password });
      res.json({ message: 'Signed in successfully', ...result });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AuthController;
