const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  let playerTurn = 1;
  let playerToken;

  const getPlayerToken = () => {
    if (playerTurn === 1) {
      playerToken = player1.getToken();
    } else {
      playerToken = player2.getToken();
    }
    return playerToken;
  };

  const playGame = (cell) => {
    if (!identifyWin()) {
      playerToken = getPlayerToken();
      let row = Math.trunc(cell / 3);
      let column = cell % 3;
      if (!board[row][column]) {
        board[row][column] = playerToken;
        switchPlayer();
      }
    }
  };

  const switchPlayer = () => {
    playerTurn === 1 ? (playerTurn = 2) : (playerTurn = 1);
  };

  const identifyWin = () => {
    let numberOfRows = board.length;
    let numberOfColumns = board[0].length;
    let row = 0;
    let column = 0;
    if (
      rowVictory(row, column, numberOfRows) ||
      columnVictory(row, column, numberOfColumns)
    ) {
      return true;
    }
  };

  const rowVictory = (row, column, numberOfRows) => {
    for (row; row < numberOfRows; row++) {
      if (
        board[row][column] === board[row][column + 1] &&
        board[row][column + 1] === board[row][column + 2]
      ) {
        if (board[row][column]) {
          return true;
        }
      }
    }
  };

  const columnVictory = (row, column, numberOfColumns) => {
    for (column; column < numberOfColumns; column++) {
      if (
        board[row][column] === board[row + 1][column] &&
        board[row + 1][column] === board[row + 2][column]
      ) {
        if (board[row][column]) {
          return true;
        }
      }
    }
  };
  // console.log(
  //   row[column] === row[column + 1] && row[column + 1] === row[column + 2]
  // );

  return { getBoard, playGame };
})();

const displayController = (() => {
  //DOM cache
  const cells = document.querySelectorAll(".ttt-cell");

  const render = () => {
    const board = gameBoard.getBoard();
    let row;
    let column;
    totalCells = cells.length;
    for (let i = 0; i < totalCells; i++) {
      row = Math.trunc(i / 3);
      column = i % 3;
      cells[i].textContent = board[row][column];
    }
  };

  const clickRender = (cell) => {
    let index = cell.getAttribute("data-index");
    gameBoard.playGame(index);
    render();
  };

  //bind events
  cells.forEach((cell) => {
    cell.addEventListener("click", clickRender.bind(null, cell));
  });

  return { render };
})();

displayController.render();

const playerFactory = (name, token) => {
  const getName = () => {
    return name;
  };

  const getToken = () => {
    return token;
  };
  return { getName, getToken };
};

const player1 = playerFactory("Player1", "X");
const player2 = playerFactory("Player2", "O");
