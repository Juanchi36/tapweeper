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

function getMines(difficulty, totalNumOfSquares) {
  switch (difficulty) {
    case '1':
      return Math.floor(totalNumOfSquares * 0.075);
      break;
    case '2':
      return Math.floor(totalNumOfSquares * 0.1);
      break;
    case '3':
      return Math.floor(totalNumOfSquares * 0.125);
  }
};

function minesLayout(board, size, numberOfMines) {
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {

      // Ignore squares with mines
      if (board[row][column] === -1) {
        continue;
      }

      let numOfNearMines = 0;

      // Looking for mines and assign number of mines arround
      relationMap.forEach(relIndex => {
        let rowToCheck = row + relIndex.row;
        let colToCheck = column + relIndex.col;
        if (!isInBounds(size, rowToCheck, colToCheck)) return;
        if (board[rowToCheck][colToCheck] === -1) {
          numOfNearMines++;
        }
      });
      board[row][column] = numOfNearMines;
    }
  }
  return {board: board, size: size, minesAmount: numberOfMines};
};

function isInBounds(size, row, col) {
  let rowInBounds = row >= 0 && row < size ? true : false;
  let colInBounds = col >= 0 && col < size ? true : false;
  return rowInBounds && colInBounds;
};

function generateNewBoard(size, difficulty) {
  let numberOfMines = getMines(difficulty, size * size)
  let board = [];
  
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = 0;
    }
  }

  // Put mines in a random place
  for (let i = 0; i < numberOfMines; i++) {
    let row = Math.floor(Math.random() * size);
    let column = Math.floor(Math.random() * size);
    // Place mine if it's empty
    if (board[row][column] === 0) {
      board[row][column] = -1;
    } else {
      i--;
    }
  }
  
  return minesLayout(board, size, numberOfMines);
};

module.exports = {
  generateNewBoard,
};