const cellElements = document.querySelectorAll('[data-cell]')
const littleBoards = document.querySelectorAll('[board]')
const board = document.getElementById('big-board')
const x_class = 'x'
const o_class = 'o'
const next = 'next'
const winning_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cell_combos = [
    // board 0
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    // board 1
    [9, 10, 11],
    [12, 13, 14],
    [15, 16, 17],
    [9, 12, 15],
    [10, 13, 16],
    [11, 14, 17],
    [9, 13, 17],
    [11, 13, 15],
    // board 2
    [18, 19, 20],
    [21, 22, 23],
    [24, 25, 26],
    [18, 21, 24],
    [19, 22, 25],
    [20, 23, 26],
    [18, 22, 26],
    [20, 22, 24],
    // board 3
    [27, 28, 29],
    [30, 31, 32],
    [33, 34, 35],
    [27, 30, 33],
    [28, 31, 34],
    [29, 32, 35],
    [27, 31, 35],
    [29, 31, 33],
    // board 4
    [36, 37, 38],
    [39, 40, 41],
    [42, 43, 44],
    [36, 39, 42],
    [37, 40, 43],
    [38, 41, 44],
    [36, 40, 44],
    [38, 40, 42],
    // board 5
    [45, 46, 47],
    [48, 49, 50],
    [51, 52, 53],
    [45, 48, 51],
    [46, 49, 52],
    [47, 50, 53],
    [45, 49, 53],
    [47, 49, 51],
    // board 6
    [54, 55, 56],
    [57, 58, 59],
    [60, 61, 62],
    [54, 57, 60],
    [55, 58, 61],
    [56, 59, 62],
    [54, 58, 62],
    [56, 58, 60],
    // board 7
    [63, 64, 65],
    [66, 67, 68],
    [69, 70, 71],
    [63, 66, 69],
    [64, 67, 70],
    [65, 68, 71],
    [63, 67, 71],
    [65, 67, 69],
    // board 8
    [72, 73, 74],
    [75, 76, 77],
    [78, 79, 80],
    [72, 75, 78],
    [73, 76, 79],
    [74, 77, 80],
    [72, 76, 80],
    [74, 76, 78]
]
const winningMessage = document.querySelector('[data-winning-message]')
const winningMessageElement = document.getElementById('winning-message')
const restartButton = document.getElementById('restartButton')
let oTurn
let nextBox

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    oTurn = false
    nextBox = false
    cellElements.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    littleBoards.forEach(board => {
        board.classList.remove(x_class)
        board.classList.remove(o_class)
        board.classList.remove(next)
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? o_class : x_class
    if (validMove(cell)) {
        if (nextBox != false) {
            nextBox.classList.remove(next)
        }
        const boardnum = boardNumFinder(cell)
        placeMark(cell, currentClass)
        if(checkSmallBoard(currentClass)) {
            boardWin(boardnum, currentClass)
            if(checkWin(currentClass)) {
                endGame(false)
            } else if(isDraw()) {
                endGame(true)
            } else {
                swapTurns()
                setBoardHoverClass()
            }
        } else {
            swapTurns()
            setBoardHoverClass()
        }
    } else {
        alert ("invalid move, go again")
    }
}

function validMove(cell) {
    if (nextBox == false) {
        return true
    }
    if (cell.parentElement == nextBox) {
        return true
    } else {
        return false
    }
}

function boardNumFinder(cell) {
    for (i = 0; i < 81; i++) {
        if (cell == cellElements.item(i)) {
            let nextBoxNumber = i % 9
            console.log(nextBoxNumber)
            if (littleBoards[nextBoxNumber].classList[1] == x_class ||
                littleBoards[nextBoxNumber].classList[1] == o_class) {
                nextBox = false
            } else {
                nextBox = littleBoards[nextBoxNumber]
                console.log(nextBox)
                nextBox.classList.add(next)
            }
            if (Math.floor(i/9) == 0) {
                return littleBoards[0]
            } else if (Math.floor(i/9) == 1) {
                return littleBoards[1]
            } else if (Math.floor(i/9) == 2) {
                return littleBoards[2]
            } else if (Math.floor(i/9) == 3) {
                return littleBoards[3]
            } else if (Math.floor(i/9) == 4) {
                return littleBoards[4]
            } else if (Math.floor(i/9) == 5) {
                return littleBoards[5]
            } else if (Math.floor(i/9) == 6) {
                return littleBoards[6]
            } else if (Math.floor(i/9) == 7) {
                return littleBoards[7]
            } else if (Math.floor(i/9) == 8) {
                return littleBoards[8]
            } else {
                return littleBoards[9]
            }
        }
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn
}

function setBoardHoverClass() {
    board.classList.remove(x_class)
    board.classList.remove(o_class)
    if (oTurn) {
        board.classList.add(o_class)
    } else {
        board.classList.add(x_class)
    }
}

function checkSmallBoard(currentClass) {
    return cell_combos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function boardWin(boardnum, currentClass) {
    boardnum.classList.add(currentClass)
    if (boardnum == littleBoards[0]) {
        for (i = 0; i < 9; i++) {
            cellElements[i].classList.remove(x_class)
            cellElements[i].classList.remove(o_class)
        }
    } else if (boardnum == littleBoards[1]) {
        for (i = 9; i < 18; i++) {
            cellElements[i].classList.remove(x_class)
            cellElements[i].classList.remove(o_class)
        }
    } else if (boardnum == littleBoards[2]) {
        for (i = 18; i < 27; i++) {
            cellElements[i].classList.remove(x_class)
            cellElements[i].classList.remove(o_class)
        }
    } else if (boardnum == littleBoards[3]) {
        for (i = 27; i < 36; i++) {
            cellElements[i].classList.remove(x_class)
            cellElements[i].classList.remove(o_class)
        }
    } else if (boardnum == littleBoards[4]) {
        for (i = 36; i < 45; i++) {
            cellElements[i].classList.remove(x_class)
            cellElements[i].classList.remove(o_class)
        }
    } else if (boardnum == littleBoards[5]) {
        for (i = 45; i < 54; i++) {
            cellElements[i].classList.remove(x_class)
            cellElements[i].classList.remove(o_class)
        }
    } else if (boardnum == littleBoards[6]) {
        for (i = 54; i < 63; i++) {
            cellElements[i].classList.remove(x_class)
            cellElements[i].classList.remove(o_class)
        }
    } else if (boardnum == littleBoards[7]) {
        for (i = 63; i < 72; i++) {
            cellElements[i].classList.remove(x_class)
            cellElements[i].classList.remove(o_class)
        }
    } else if (boardnum == littleBoards[8]) {
        for (i = 72; i < 81; i++) {
            cellElements[i].classList.remove(x_class)
            cellElements[i].classList.remove(o_class)
        }
    }
}

function checkWin(currentClass) {
    return winning_combos.some(combination => {
        return combination.every(index => {
            return littleBoards[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
}

function endGame(draw) {
    if(draw) {
        winningMessage.innerText = 'Draw!'
    } else {
        if(oTurn) {
            winningMessage.innerText = 'O wins!'
        } else {
            winningMessage.innerText = 'X wins!'
        }
    }
    winningMessageElement.classList.add('show')
}
