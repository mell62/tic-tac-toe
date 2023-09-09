const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  let playerTurn = 1;
  let playerToken;
  let winnerToken;
  let victoryArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getPlayerToken = () => {
    if (playerTurn === 1) {
      playerToken = player1.getToken();
    } else {
      playerToken = player2.getToken();
    }
    return playerToken;
  };

  const playGame = (cell) => {
    if (!identifyWin() && !identifyDraw()) {
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
      columnVictory(row, column, numberOfColumns) ||
      diagonalVictory(row, column)
    ) {
      return true;
    } else {
      false;
    }
  };

  const rowVictory = (row, column, numberOfRows) => {
    for (row; row < numberOfRows; row++) {
      if (
        board[row][column] === board[row][column + 1] &&
        board[row][column + 1] === board[row][column + 2]
      ) {
        if (board[row][column]) {
          //check for empty cell
          winnerToken = board[row][column];
          victoryArray[row][column] = winnerToken;
          victoryArray[row][column + 1] = winnerToken;
          victoryArray[row][column + 2] = winnerToken;
          return true;
        }
      }
    }
    return false;
  };

  const columnVictory = (row, column, numberOfColumns) => {
    for (column; column < numberOfColumns; column++) {
      if (
        board[row][column] === board[row + 1][column] &&
        board[row + 1][column] === board[row + 2][column]
      ) {
        if (board[row][column]) {
          //check for empty cell
          winnerToken = board[row][column];
          victoryArray[row][column] = winnerToken;
          victoryArray[row + 1][column] = winnerToken;
          victoryArray[row + 2][column] = winnerToken;
          return true;
        }
      }
    }
    return false;
  };

  const diagonalVictory = (row, column) => {
    if (
      //left-to-right diagonal
      board[row][column] === board[row + 1][column + 1] &&
      board[row + 1][column + 1] === board[row + 2][column + 2]
    ) {
      if (board[row][column]) {
        //check for empty cell
        winnerToken = board[row][column];
        victoryArray[row][column] = winnerToken;
        victoryArray[row + 1][column + 1] = winnerToken;
        victoryArray[row + 2][column + 2] = winnerToken;
        return true;
      }
    } else if (
      //right-to-left diagonal
      board[row + 2][column] === board[row + 1][column + 1] &&
      board[row + 1][column + 1] === board[row][column + 2]
    ) {
      if (board[row + 2][column]) {
        //check for empty cell
        winnerToken = board[row + 2][column];
        victoryArray[row + 2][column] = winnerToken;
        victoryArray[row + 1][column + 1] = winnerToken;
        victoryArray[row][column + 2] = winnerToken;
        return true;
      }
    } else {
      return false;
    }
  };

  const identifyDraw = () => {
    let numberOfRows = board.length;
    for (let row = 0; row < numberOfRows; row++) {
      if (board[row].indexOf("") === -1) {
        continue;
      } else {
        return false;
      }
    }
    return true;
    // more readable version
    // let filledRows = 0;
    // board.forEach((row) => {
    //   if (row.indexOf("") === -1) {
    //     filledRows += 1;
    //   }
    // });

    // if (filledRows === 3) {
    //   return true;
    // } else {
    //   return false;
    // }
  };

  const getWinner = () => {
    if (identifyWin()) {
      return winnerToken;
    } else {
      return false;
    }
  };

  const getDraw = () => {
    if (identifyDraw()) {
      return true;
    } else {
      return false;
    }
  };

  const winIndices = () => {
    victoryArray = victoryArray.flat();
    let winIndicesArray = victoryArray.reduce((indicesArray, item, index) => {
      if (item) {
        indicesArray.push(index);
      }
      return indicesArray;
    }, []);
    return winIndicesArray;
  };

  const resetBoard = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    playerTurn = 1;
    victoryArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  return {
    getBoard,
    playGame,
    getWinner,
    getDraw,
    resetBoard,
    winIndices,
  };
})();

const displayController = (() => {
  //DOM cache
  const cells = document.querySelectorAll(".ttt-cell");
  const restartBtn = document.querySelector(".restart-btn");
  const setNameBtn1 = document.querySelector(".set-name-btn1");
  const setNameBtn2 = document.querySelector(".set-name-btn2");
  const player1Field = document.querySelector(".player1-field");
  const player2Field = document.querySelector(".player2-field");
  const playerForm = document.querySelector(".player-form");

  const render = () => {
    const board = gameBoard.getBoard();
    let row;
    let column;
    totalCells = cells.length;
    for (let i = 0; i < totalCells; i++) {
      row = Math.trunc(i / 3);
      column = i % 3;
      let token = board[row][column];
      tokenRender(token, i);
    }
  };

  const clickRender = (cell) => {
    let index = cell.getAttribute("data-index");
    gameBoard.playGame(index);
    render();
    if (gameBoard.getWinner()) {
      console.log("The winner is " + gameBoard.getWinner());
      winRender(gameBoard.getWinner());
    } else if (gameBoard.getDraw()) {
      console.log("Game ended in a draw");
    }
  };

  const tokenRender = (token, cell) => {
    if (token === "X") {
      cells[cell].classList.add("token-x");
    } else if (token === "O") {
      cells[cell].classList.add("token-o");
    } else {
      cells[cell].classList.remove(
        "token-x",
        "token-o",
        "token-x-win",
        "token-o-win"
      );
    }
  };

  const restartGame = () => {
    gameBoard.resetBoard();
    render();
  };

  const winRender = (token) => {
    gameBoard.winIndices().forEach((index) => {
      if (token === "X") {
        cells[index].classList.add("token-x-win");
      } else if (token === "O") {
        cells[index].classList.add("token-o-win");
      }
    });
  };

  const focusOnInput = (inputField) => {
    inputField.removeAttribute("disabled");
    inputField.focus();
  };

  //bind events
  cells.forEach((cell) => {
    cell.addEventListener("click", clickRender.bind(null, cell));
  });

  restartBtn.addEventListener("click", restartGame);

  setNameBtn1.addEventListener("click", focusOnInput.bind(null, player1Field));
  setNameBtn2.addEventListener("click", focusOnInput.bind(null, player2Field));

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
