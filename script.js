const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  let playerTurn = 1;
  let playerToken;

  const playGame = (cell) => {
    if (playerTurn == 1) {
      playerToken = player1.getToken();
    } else {
      playerToken = player2.getToken();
    }
    let row = Math.trunc(cell / 3);
    let column = cell % 3;
    if (!board[row][column]) {
      board[row][column] = playerToken;
      switchPlayer();
    }
  };

  const switchPlayer = () => {
    playerTurn === 1 ? (playerTurn = 2) : (playerTurn = 1);
  };

  return { getBoard, playGame };
})();

const displayController = (() => {
  const board = gameBoard.getBoard();

  //DOM cache
  const cells = document.querySelectorAll(".ttt-cell");

  const render = () => {
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
