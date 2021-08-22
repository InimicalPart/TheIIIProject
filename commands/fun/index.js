function motivation() {
	return require("./motivation/motivation.js")
}
function roast() {
	return require("./roast/roast.js")
}
function chess() {
	return require("./chess/chess.js")
}

function sudoku() {
	return require("./sudoku/sudoku.js")
}

function minesweeper() {
	return require("./minesweeper/minesweeper.js")
}

function uno() {
	return require("./uno/uno.js")
}

function bombparty() {
	return require("./bombparty/bombparty.js")
}

module.exports = {
	bombparty,
	uno,
	minesweeper,
	sudoku,
	chess,
	motivation,
	roast
}
console.log("[I] Category FUN loaded")