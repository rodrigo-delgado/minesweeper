var tests = {
  boardValid: boardValid,
  cellsValid: cellsValid
}

// Checks the board to make sure:
// 1. it is a JavaScript object
// 2. it has a cells property (which is an array)
// 3. that the cells array is not empty
// 4. that the cells array is not too large
// 5. that the number of cells can form a square
function boardValid () {
  if (typeof board !== 'object') {
    displayMessage('Remember to define your <code>board</code> object!')
    return false
  }
  if (!board.hasOwnProperty('cells')) {
    displayMessage('Your <code>board</code> object needs a property named <code>cells</code>.')
    return false
  }
  if (!isArray(board.cells)) {
    displayMessage('<code>board.cells</code> should be an array.')
    return false
  }
  if (board.cells.length === 0) {
    displayMessage("CHOOSE A NUMBER BETWEEN 3 AND 6!!!.")
    return false
  }
  if (board.cells.length > 36) {
    displayMessage("JUST A NUMBER BETWEEN 3 AND 6!!!")
    return false
  }
  if (!isSquare(board.cells.length)) {
    displayMessage('The number of cells in your object must be able to form a square: same number on each side!')
    return false
  }
  return true
}

// Check all the cells to make sure they have the correct properties
function cellsValid () {
  var invalidCells = board.cells.filter(isInvalidCell)
  return invalidCells.length === 0
}

// Checks each cell to make sure:
// 1. it has a row property
// 2. it has a col property
// 3. that the coordinates are valid
// 4. it has an isMine property
// 5. it has a hidden property
function isInvalidCell (cell) {
  if (typeof cell !== 'object') {
    displayMessage('At least one of those cells is not an object! <code>{ }</code>')
    return true
  }
  if (!cell.hasOwnProperty('row')) {
    displayMessage('I found a cell without a <code>row</code> property!')
    return true
  }
  if (!cell.hasOwnProperty('col')) {
    displayMessage('I found a cell without a <code>col</code> property!')
    return true
  }
  if (!coordinatesValid(cell)) {
    return true
  }
  if (!cell.hasOwnProperty('isMine')) {
    displayMessage("I found a cell that doesn't know if it's a mine or not (each cell needs an <code>isMine</code> property)!")
    return true
  }
  if (!cell.hasOwnProperty('hidden')) {
    displayMessage("I found a cell that doesn't know if it's hidden or not (each cell needs a <code>hidden</code> property)!")
    return true
  }
  return false
}

// Checks each set of coordinates to ensure:
// 1. they are numbers
// 2. they refer to a place inside the board
// 3. there is only one copy of each
function coordinatesValid (cell) {
  if (typeof cell.row !== 'number' || typeof cell.col !== 'number') {
    displayMessage('Both <code>row</code> and <code>col</code> must be numbers (not strings or anything else).')
    return false
  }
  var duplicates = board.cells.filter(function (c) {
    return cell.row === c.row && cell.col === c.col
  })
  if (duplicates.length > 1) {
    displayMessage('There seems to be more than one cell with <code>row: ' + cell.row +
      '</code> and <code>col: ' + cell.col + '</code>.')
    return false
  }
  var sideLength = Math.sqrt(board.cells.length)
  if (cell.row > sideLength || cell.col > sideLength) {
    displayMessage('I found a cell with <code>row</code> or <code>col</code> outside the board boundaries.')
    return false
  }
  return true
}

function isSquare (numberOfCells) {
  if (numberOfCells === 1) {
    return false
  }

  // Check for whole numbers per http://stackoverflow.com/a/2304062/122643
  return Math.sqrt(numberOfCells) %1 === 0
}

function isArray(a) {
  return Object.prototype.toString.call(a) === '[object Array]'
}
