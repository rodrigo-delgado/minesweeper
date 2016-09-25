document.addEventListener('DOMContentLoaded', startGame);
  // Define your `board` object here!
var board = {
  cells: [
    /*{ row: 0, col: 0, isMine: false, hidden: true },
      { row: 0, col: 1, isMine: false, hidden: true },
      { row: 0, col: 2, isMine: true, hidden: true },
      { row: 1, col: 0, isMine: false, hidden: true },
      { row: 1, col: 1, isMine: true, hidden: true },
      { row: 1, col: 2, isMine: false, hidden: true },
      { row: 2, col: 0, isMine: false, hidden: true },
      { row: 2, col: 1, isMine: true, hidden: true },
      { row: 2, col: 2, isMine: false, hidden: true },*/
  ]
};

function Cell(row, col, isMine, isMarked, hidden) {
  this.row = row;
  this.col = col;
  this.isMine = isMine;
  this.isMarked = isMarked;
  this.hidden = hidden;
}
var setupBoard = prompt("Choose a number between 3 and 6");
createBoard(setupBoard, setupBoard);

function createBoard(width, height) {
  var row = 0;
  for (i = 0; i < height; i++) {
    var col = 0;
    for (j = 0; j < width; j++) {
      var newCell = new Cell(row, col, Mines(), false, true);
      board.cells.push(newCell);
      col++;
    }
    row++;
  }
}

function Mines(randomMine) {
  var randomMine = Math.floor(Math.random() * 25);
  if (randomMine < 5) {
    return true;
  } else {
    return false;
  }
}

function startGame() {
    //Write a for loop This should loop through the contents of board.cells
    //The loop's only job should be to call countSurroundingMines once for each cell in board.cells
    for (var i = 0; i < board.cells.length; i++) {
      board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    }
    // Don't remove this function call: it makes the game work!
    lib.initBoard();
    document.addEventListener("click", checkForWin);
    document.addEventListener("contextmenu", checkForWin);
    reset.addEventListener('click', function(evt) {
      location.reload();
    });
  }
  // Add event listener to reset button
  //
  // 1. Are all of the cells that are NOT mines visible?
  // 2. Are all of the mines marked?

function checkForWin() {
    var winner = true;
    var youWin = document.getElementById("win");
    for (var i = 0; i < board.cells.length; i++) {
      if (board.cells[i].isMine === true && board.cells[i].isMarked === false) {
        return "";
      }
      if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
        return "";
      }
    }
    lib.displayMessage("You win!");
    youWin.play();
    document.getElementById("fireworks.wav").play();
  }
  // Count surrounding mines here:

function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      count += 1;
    }
  }
  return count;
}
