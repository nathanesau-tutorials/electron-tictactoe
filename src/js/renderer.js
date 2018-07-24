console.log('renderer process 1')

const unhandled = require('electron-unhandled')
unhandled()

const board=[['B','B','B'],['B','B','B'],['B','B','B']]

const grid = [[null, null, null],[null, null, null],[null, null, null]] // not used

const updateBoard = function(move) {
	board[move.row][move.col] = move.symbol
}

const getWinner = function() {
	var diag1 = [board[0][0], board[1][1], board[2][2]]
	var diag2 = [board[0][2], board[1][1], board[2][0]]
	var row1 = [board[0][0], board[0][1], board[0][2]]
	var row2 = [board[1][0], board[1][1], board[1][2]]
	var row3 = [board[2][0], board[2][1], board[2][2]]
	var col1 = [board[0][0], board[1][0], board[2][0]]
	var col2 = [board[0][1], board[1][1], board[2][1]]
	var col3 = [board[0][2], board[1][2], board[2][2]]
	var lines = [diag1, diag2, row1, row2, row3, col1, col2, col3]
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i]
		if(line[0] == line[1] && line[1] == line[2]) {
			return line[0]
		}
	}
	return 'B'
}

function isFull() {
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {
			if(board[i][j] == 'B') {
				return false
			}
		}
	}
	return true
}

const getMoveOptions = function() {
	var options = []
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if(board[i][j] == 'B') {
				options.push([i,j])
			}
		}
	}
	return options
}

const getAIMove = function() {
	var moveOptions = getMoveOptions()
	var whichMove = Math.floor(Math.random() * moveOptions.length)
	return {symbol: 'O',
		row: moveOptions[whichMove][0],
		col: moveOptions[whichMove][1]}
}

function drawO(center) {
	var ctx = GUI.getContext('2d')
	ctx.beginPath()
	ctx.arc(center[0], center[1], 50, 0, -Math.PI * 0.5, false)
	ctx.arc(center[0], center[1], 50, -Math.PI * 0.5, true)
	ctx.fillStyle = 'white'
	ctx.fill()
	ctx.strokeStyle = 'black'
	ctx.stroke()
	ctx.closePath()
}

function drawX(topLeft,bottomRight) {
	var ctx = GUI.getContext('2d')
	ctx.beginPath()
	ctx.moveTo(topLeft[0], topLeft[1])
	ctx.lineTo(bottomRight[0], bottomRight[1])
	ctx.stroke()
	ctx.closePath()
}

function draw(move) {
	var row_height = 500/3
	var col_width = 500/3
	var col = move.col
	var row = move.row
	var symbol = move.symbol
	if(symbol=='O') {
		var topLeft = [col*col_width, row*row_height]
		var bottomRight = [(col+1)*col_width, (row+1)*row_height]
		var center = [(topLeft[0] + bottomRight[0])/2, (topLeft[1] + bottomRight[1])/2]
		grid[row,col] = {symbol:'O', topLeft: topLeft, bottomRight: bottomRight}
		drawO(center)
	} else {
		topLeft = [col*col_width, row*row_height]
		bottomRight = [(col+1)*col_width, (row+1)*row_height]
		grid[row,col] = {symbol:'X', topLeft: topLeft, bottomRight: bottomRight}
		drawX(topLeft, bottomRight)
	}
}

//function sleep(ms) {
//	return new Promise(resolve => setTimeout(resolve, ms))
//}

const GUI = document.getElementById('myCanvas');

GUI.addEventListener('click', function (event) {
	var row_height = 500/3 // canvas dimensions
	var col_width = 500/3
	var col = Math.floor(event.x/col_width)
	var row = Math.floor(event.y/row_height)
	
	if(board[row][col] != 'B') {
		// invalid move (ignore)
	} else {
		var humanMove = {symbol: 'X',
			row: row,
			col: col}
		updateBoard(humanMove)
		draw(humanMove)
		//await sleep(500)
		if(getWinner() == 'X') {
			console.log('X wins')
		} else if(isFull()) {
			console.log('Board full')
		} else {
			const aiMove = getAIMove()
			updateBoard(aiMove)
			draw(aiMove)
			if(getWinner() == 'O') {
				console.log('O wins')
			} else if(isFull()) {
				console.log('Board full')
			}
		}
	}
})

