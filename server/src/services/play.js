const relationMap = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
];

function isInBounds(size, row, col) {
  let rowInBounds = row >= 0 && row < size ? true : false;
  let colInBounds = col >= 0 && col < size ? true : false;
  return rowInBounds && colInBounds;
};

function uncoverAdjacentSpaces(board, position, size, minesAmount) {
  // Uncover square
  board[position[0]][position[1]] = board[position[0]][position[1]].toString();

  // Check Near Squares.  Uncover all non-bombs, and recurse on zeros
  relationMap.forEach(relIndex => {
    let rowToCheck = position[0] + relIndex.row;
    let colToCheck = position[1] + relIndex.col;
    if (!isInBounds(size, rowToCheck, colToCheck)) return;
    if (typeof(board[rowToCheck][colToCheck]) === 'string') return;
    if (board[rowToCheck][colToCheck] === -1) return;
    if (board[rowToCheck][colToCheck] > 0) {
      board[rowToCheck][colToCheck] = board[rowToCheck][colToCheck].toString();
    } else {
      uncoverAdjacentSpaces(board, [rowToCheck, colToCheck], size, minesAmount);
    }
  });
}

function isWinner(board, size, minesAmount) {
  let uncovered = 0;

  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      if (typeof(board[row][column]) === 'string') {
        uncovered++;
      }
    }
  };
  return (size * size) - uncovered === minesAmount ? 'winner' : false
};

function uncoverSquare(board, position, size, minesAmount) {
  // Change game status if a mine was uncovered
  if (board[position[0]][position[1]] === -1) return { status: 'game over' };

  // If content is not zero mark a square as uncovered
  if (board[position[0]][position[1]] !== 0) {
    board[position[0]][position[1]] = board[position[0]][position[1]].toString();
  }
  // If content is zero, uncover it and near spaces too
  if (board[position[0]][position[1]] === 0) {
    uncoverAdjacentSpaces(board, position, size, minesAmount);
  }
  // Check for winner
  const status = (isWinner(board, size, minesAmount))
  return {board: board, status: status, size: size, minesAmount: minesAmount};
};

module.exports = {
  uncoverSquare,
};