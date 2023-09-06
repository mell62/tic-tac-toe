const tttGrid = (() => {
  let tttArray = [
    ["X", "O", "X"],
    ["X", "O", "X"],
    ["X", "O", "X"],
  ];

  //DOM cache
  let cells = document.querySelectorAll(".ttt-cell");

  //bind events

  function render() {
    let row = 0;
    let column = 0;
    for (let i = 1; i < cells.length + 1; i++) {
      cells[i - 1].textContent = tttArray[row][column];
      column++;
      if (i % 3 === 0) {
        row++;
        column = 0;
      }
    }
  }

  return { render };
})();

tttGrid.render();
