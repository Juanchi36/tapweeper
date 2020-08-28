const express = require('express');
const router = express.Router();
const { uncoverSquare } = require('../services/play');

router.post('/uncover', async (req, res) => {
  const board = req.body.board;
  const position = req.body.position;
  const size = req.body.size
  const minesAmount = req.body.minesAmount
  res.json(uncoverSquare(board, position, size, minesAmount));
});

module.exports = router;