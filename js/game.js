'use strict'

// global variables

let gCells = {
    MINE: '💣',
    FLAG: '🚩',
    EMPTY: '',
}

let gBoard = {
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true,
}

let gLevel = {
    easy: { size: 4, mines: 2 },
    medium: { size: 8, mines: 14 },
    expert: { size: 12, mines: 32 },
}

let gCurrentLevel = 'medium'
let gTable = buildBoard()
let gFinished = false

// ---------------------------------------------------------------------

function initGame() {
    console.log('init game')
    renderBoard()
    window.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        rightClickEvent(event)
    }, false)
    setMinesInRandomCells(gTable, getCurrentLevel().size, getCurrentLevel().mines)
}

function rightClickEvent(event) {
    let className = event.path[0].className
    let i_and_j = className.split(" ")
    let i = +i_and_j[0]
    let j = +i_and_j[1]
    let elBoard = document.querySelector('table')
    let elCell = elBoard.rows[i].cells[j];
    if (event.button === 2) {
        cellClicked(elCell, i, j, 0)
    }
}

function buildBoard() {
    const board = []
    for (let i = 0; i < getCurrentLevel().size; i++) {
        board[i] = []
        for (let j = 0; j < getCurrentLevel().size; j++) {
            board[i][j] = gBoard
        }
    }
    console.table(board)
    return board
}

function getCurrentLevel() {
    switch (gCurrentLevel) {
        case 'easy': return gLevel.easy
        case 'medium': return gLevel.medium
        case 'expert': return gLevel.expert
    }
}

function renderBoard() {
    let elBoard = document.querySelector('table')
    let strHTML = ''
    for (let i = 0; i < gTable.length; i++) {
        strHTML += `\n<tr class="board-row">\n`
        for (let j = 0; j < gTable.length; j++) {
        //    const cell = gTable[i][j]
            let className = 'cell-' + i + '-' + j
            strHTML += `\t<td  class="${i} ${j}"           
            onclick="cellClicked(this, ${i}, ${j}, ${1})"></td>\n`
        }
        strHTML += `</tr>\n`
    }
    elBoard.innerHTML = strHTML
}

function cellClicked(elCell, i, j, leftClick) {
    // TODO timer
    if (gFinished)
        return

    if (leftClick === 1) {
        // console.log('left click') 
        // console.log('elCell=', elCell) 
        // console.log('i=' + i + " j=" + j)
        leftCellClicked(i, j)
    }
    else if (leftClick === 0) {
        // console.log('right click')
        // console.log('elCell=', elCell) 
        // console.log('i=' + i + " j=" + j) 
        rightCellClicked(elCell)
    }
    checkWin()
}

function rightCellClicked(elCell) {
    // toggle('hide')
    if (elCell.innerHTML === gCells.FLAG)
        elCell.innerHTML = ""
    else
        elCell.innerHTML = gCells.FLAG
}

function leftCellClicked(i, j) {

    // 1) is mine 
    if (isMine(i, j)) {
        openAllMines()
        gameOver(false)
        return
    }

    // 2) check if elCell has mine negs
    let minesCount = getNegsMineCount(i, j)
    if (minesCount > 0) {
        openCell(i, j)
    }
    // 3) open all negs of cell without mine negs
    else {
        openAllNegCells(i, j)
    }
}

function isMine(i, j) {
    return gTable[i][j] === gCells.MINE
}

function isFlagged(i, j) {
    let elBoard = document.querySelector('table')
    let elCell = elBoard.rows[i].cells[j]
    return (elCell.innerHTML === gCells.FLAG)
}

function openAllMines() {
    let elBoard = document.querySelector('table')
    for (let i = 0; i < gTable.length; i++) {
        for (let j = 0; j < gTable[0].length; j++) {
            if (isMine(i, j)) {
                let elCell = elBoard.rows[i].cells[j]
                elCell.innerHTML = gCells.MINE
            }
        }
    }
}

function checkWin() {
    if (checkIfAllMinesAreFlagged() && checkIfAllCellsAreOpen()) {
        gameOver(true)
    }
}

function checkIfAllCellsAreOpen() {
    for (let i = 0; i < gTable.length; i++) {
        for (let j = 0; j < gTable[0].length; j++) {
            if (!isMine(i, j)) {
                if (!cellIsOpen(i, j))
                    return false
            }
        }
    }
    return true
}

function checkIfAllMinesAreFlagged() {
    let numOfMines = getCurrentLevel().mines
    let countOfFlaggedMines = 0

    for (let i = 0; i < gTable.length; i++) {
        for (let j = 0; j < gTable[0].length; j++) {

            // 1) if is mine
            if (isMine(i, j)) {

                // 2) if is flagged
                if (isFlagged(i, j)) {
                    countOfFlaggedMines++
                }
            }
        }
    }
    // 3) return: all mines are flagged
    return (countOfFlaggedMines === numOfMines)
}

function gameOver(succeeded) {
    // TODO restart button, and clear gTimerInterval
    // TODO modal - you win / you lose
    if (succeeded) {
        console.log('you win')
    } else {
        console.log('you lose')
    }
    gFinished = true
}

function getNegsMineCount(i, j) {
    let count = 0

    let iMin = (i > 0 ? i - 1 : i)
    let iMax = (i === gTable.length - 1 ? i : i + 1)

    let jMin = (j > 0 ? j - 1 : j)
    let jMax = (j === gTable[0].length - 1 ? j : j + 1)

    for (let ii = iMin; ii <= iMax; ii++) {
        for (let jj = jMin; jj <= jMax; jj++) {
            if (isMine(ii, jj))
                count++
        }
    }
    return count
}

function setNegsMineCount(i, j, count) {
    let elBoard = document.querySelector('table')
    let elCell = elBoard.rows[i].cells[j]
    elCell.innerText = count
}

function openCell(i, j) {
    // 1) set back color
    let elBoard = document.querySelector('table')
    let elCell = elBoard.rows[i].cells[j]
    elCell.style.backgroundColor = 'lightblue';
    // 2) set count of mine negs
    let count = getNegsMineCount(i, j)
    if (count > 0)
        setNegsMineCount(i, j, count)
}

function cellIsOpen(i, j) {
    let elBoard = document.querySelector('table')
    let elCell = elBoard.rows[i].cells[j]
    return elCell.style.backgroundColor === 'lightblue';
}

function openAllNegCells(i, j) {
    let iMin = (i > 0 ? i - 1 : i)
    let iMax = (i === gTable.length - 1 ? i : i + 1)

    let jMin = (j > 0 ? j - 1 : j)
    let jMax = (j === gTable[0].length - 1 ? j : j + 1)

    for (let ii = iMin; ii <= iMax; ii++) {
        for (let jj = jMin; jj <= jMax; jj++) {
            openCell(ii, jj)
        }
    }
}

function setMinesInRandomCells(table, tableSize, numOfMines) {
    for (let i = 0; i < numOfMines;) {
        let iCell = getRandomInt(0, tableSize - 1)
        let jCell = getRandomInt(0, tableSize - 1)

        // Prevent duplication of a mine in a random cell
        if (table[iCell][jCell] === gCells.MINE) {
            console.log('double mine')
            continue
        }
        table[iCell][jCell] = gCells.MINE
        i++
    }
}















