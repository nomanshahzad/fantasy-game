const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/teamController');

router.get('/', TeamController.getAll);
router.get('/:id', TeamController.getById);
router.get('/:id/players', TeamController.getTeamPlayers);

module.exports = router;
