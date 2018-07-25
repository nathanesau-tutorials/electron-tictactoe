'use strict'

const unhandled = require('electron-unhandled')
const React = require('react')
const {dialog} = require('electron').remote
const { ipcRenderer } = require('electron')

unhandled()

class Board
{
    constructor() {
        this.data = [['B', 'B', 'B'],
            ['B', 'B', 'B'],
            ['B', 'B', 'B']]
    }

    getWinner() {
        var dia1 = [this.data[0][0], this.data[1][1], this.data[2][2]]
        var dia2 = [this.data[0][2], this.data[1][1], this.data[2][0]]
        var row1 = [this.data[0][0], this.data[0][1], this.data[0][2]]
        var row2 = [this.data[1][0], this.data[1][1], this.data[1][2]]
        var row3 = [this.data[2][0], this.data[2][1], this.data[2][2]]
        var col1 = [this.data[0][0], this.data[1][0], this.data[2][0]]
        var col2 = [this.data[0][1], this.data[1][1], this.data[2][1]]
        var col3 = [this.data[0][2], this.data[1][2], this.data[2][2]]
        var lines = [dia1, dia2, row1, row2, row3, col1, col2, col3]
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i]
            if (line[0] == line[1] && line[1] == line[2]) {
                return line[0]
            }
        }
        return 'B'
    }

    isFull() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.data[i][j] == 'B') {
                    return false
                }
            }
        }
        return true
    }

    update(move) {
        this.data[move.row][move.col] = move.symbol
    }
}

class AI
{
    constructor() {
        this.symbol = 'O'
    }

    getMoveOptions(board) {
        var options = []
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board.data[i][j] == 'B') {
                    options.push([i, j])
                }
            }
        }
        return options
    }
    
    getMove(board) {
        var moveOptions = this.getMoveOptions(board)
        var whichMove = Math.floor(Math.random() * moveOptions.length)
        return {
            symbol: this.symbol,
            row: moveOptions[whichMove][0],
            col: moveOptions[whichMove][1]
        }
    }
}

class GUI
{
    constructor() {
        this.canvas = document.getElementById('myCanvas')
        this.board = new Board()
        this.ai = new AI()
        this.grid = [[null, null, null], [null, null, null], [null, null, null]]
    }

    drawO(center) {
        var ctx = this.canvas.getContext('2d')
        ctx.beginPath()
        ctx.arc(center[0], center[1], 75, 0, -Math.PI * 0.5, false)
        ctx.arc(center[0], center[1], 75, -Math.PI * 0.5, true)
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.strokeStyle = 'black'
        ctx.stroke()
        ctx.closePath()
    }

    drawX(topLeft, bottomRight, topRight, bottomLeft) {
        var ctx = this.canvas.getContext('2d')
        ctx.beginPath()
        ctx.moveTo(topLeft[0], topLeft[1])
        ctx.lineTo(bottomRight[0], bottomRight[1])
        ctx.moveTo(topRight[0], topRight[1])
        ctx.lineTo(bottomLeft[0], bottomLeft[1])
        ctx.stroke()
        ctx.closePath()
    }

    draw(move) {
        var row_height = 500 / 3
        var col_width = 500 / 3
        var col = move.col
        var row = move.row
        var symbol = move.symbol
        let topLeft, bottomRight, topRight, bottomLeft
        if (symbol == 'O') {
            topLeft = [col * col_width, row * row_height]
            bottomRight = [(col + 1) * col_width, (row + 1) * row_height]
            topRight = [(col + 1) * col_width, row * row_height]
            bottomLeft = [col * col_width, (row + 1) * row_height]
            var center = [(topLeft[0] + bottomRight[0]) / 2, (topLeft[1] + bottomRight[1]) / 2]
            this.grid[row, col] = {
                symbol: 'O', topLeft: topLeft, bottomRight: bottomRight,
                topRight: topRight, bottomLeft: bottomLeft
            }
            this.drawO(center)
        } else {
            topLeft = [col * col_width, row * row_height]
            bottomRight = [(col + 1) * col_width, (row + 1) * row_height]
            topRight = [(col + 1) * col_width, row * row_height]
            bottomLeft = [col * col_width, (row + 1) * row_height]
            this.grid[row, col] = {
                symbol: 'X', topLeft: topLeft, bottomRight: bottomRight,
                topRight: topRight, bottomLeft: bottomLeft
            }
            this.drawX(topLeft, bottomRight, topRight, bottomLeft)
        }
    }

    showMessage(text) {
        dialog.showMessageBox({ type: 'info', buttons: ['OK'], message: text }, i => console.log(i))
    }
}

const onClick = function(event) {
    var row_height = 500 / 3 // canvas dimensions
    var col_width = 500 / 3
    var col = Math.floor(event.x / col_width)
    var row = Math.floor(event.y / row_height)

    if (gui.board.getWinner() != 'B') {
        return
    }

    if (gui.board.data[row][col] != 'B') {
        // invalid move (ignore)
    } else {
        var humanMove = {
            symbol: 'X',
            row: row,
            col: col
        }
<<<<<<< HEAD
        gui.board.update(humanMove)
        gui.draw(humanMove)
=======
        updateBoard(humanMove)
        draw(humanMove)

        doComputerMove = function() {
            const aiMove = getAIMove()
            updateBoard(aiMove)
            draw(aiMove)
        }

>>>>>>> master
        // sleep here!
        if (gui.board.getWinner() == 'X') {
            gui.showMessage('X wins')
        } else if (gui.board.isFull()) {
            gui.showMessage('Board full')
        } else {
<<<<<<< HEAD
            const aiMove = gui.ai.getMove(gui.board)
            gui.board.update(aiMove)
            gui.draw(aiMove)
            if (gui.board.getWinner() == 'O') {
                gui.showMessage('O wins')
            } else if (gui.board.isFull()) {
                gui.showMessage('Board full')
=======
            setTimeout(doComputerMove, 250)
            if (getWinner() == 'O') {
                showMessage('O wins')
            } else if (isFull()) {
                showMessage('Board full')
>>>>>>> master
            }
        }
    }
}

let gui = new GUI() // event listener handles game execution
gui.canvas.addEventListener('click', onClick)

ipcRenderer.on('New Game', function (event, msg)  {
    gui.board.data = [['B', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']]
    gui.grid = [[null, null, null], [null, null, null], [null, null, null]]
    var ctx = gui.canvas.getContext('2d')
    ctx.clearRect(0,0,gui.canvas.width, gui.canvas.height)
})
