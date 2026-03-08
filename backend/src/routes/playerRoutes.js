const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/playerController');

router.get('/', PlayerController.getAll);
router.get('/:id', PlayerController.getById);

module.exports = router;
