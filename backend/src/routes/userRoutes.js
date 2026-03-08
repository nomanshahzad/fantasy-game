const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);

module.exports = router;
