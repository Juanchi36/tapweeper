const express = require('express');
const router = express.Router();
const {generateNewBoard} = require('../services/board');

router.get('/', async (req, res) => {
  const size = req.query.size;
  const difficulty = req.query.difficulty;
  res.json(generateNewBoard(size, difficulty));
});

module.exports = router;
