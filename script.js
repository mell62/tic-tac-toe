const gameBoard = (() => {
  let board = [
    ["X", "O", "X"],
    ["X", "O", "X"],
    ["X", "O", "X"],
  ];

  const getBoard = () => board;

  return { getBoard };
})();

const displayController = (() => {
  let board = gameBoard.getBoard();

  //DOM cache
  let cells = document.querySelectorAll(".ttt-cell");

  //bind events

  const render = () => {
    let row = 0;
    let column = 0;
    for (let i = 1; i < cells.length + 1; i++) {
      cells[i - 1].textContent = board[row][column];
      column++;
      if (i % 3 === 0) {
        // Jump to next row
        row++;
        column = 0;
      }
    }
  };

  return { render };
})();

displayController.render();
