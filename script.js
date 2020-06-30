const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const x_class = 'x'
const o_class = 'o'
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
const winningMessage = document.querySelector('[data-winning-message]')
const winningMessageElement = document.getElementById('winning-message')
const restartButton = document.getElementById('restartButton')
let oTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? o_class : x_class
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
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

function checkWin(currentClass) {
    return winning_combos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
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