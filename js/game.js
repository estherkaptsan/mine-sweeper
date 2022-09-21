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
    easy:   { size: 4, mines: 2 },
    medium: { size: 8, mines: 14 },
    expert: { size: 12, mines: 32 },

}
let gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}

let gTable = buildBoard()

// -------------------------------------------------------------------

function initGame() {
    console.log('init game')
    renderBoard()
    window.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        routeRightClickEvent(event)
       }, false);
}

function routeRightClickEvent(event) {
    let className = event.path[0].className
    let i_and_j = className.split(" ")
    let i = +i_and_j[0]
    let j = +i_and_j[1]
    let elBoard = document.querySelector('table')
    let elCell = elBoard.rows[i].cells[j];
    if(event.button === 2) {
        cellClicked(elCell, i, j, 0)
    } 
}

function buildBoard() {
    const board = []
    for (let i = 0; i < gLevel.easy.size; i++) {
        board[i] = []
        for (let j = 0; j < gLevel.easy.size; j++) {
            board[i][j] = gBoard
            if ((i === 1 && j === 1) || (i === 3 && j === 2)) {
                board[i][j] = gCells.MINE
            }
        }
    }
    console.table(board)
    return board
}

function setMinesNegsCount(board) {

}

function renderBoard() {
    let elBoard = document.querySelector('table')
    let strHTML = ''
    for (let i = 0; i < gTable.length; i++) {
        strHTML += `\n<tr class="board-row">\n`
        for (let j = 0; j < gTable.length; j++) {
            const cell = gTable[i][j]
            let className = 'cell-' + i + '-' + j
            strHTML += `\t<td  class="${i} ${j}"           
            onclick="cellClicked(this, ${i}, ${j}, ${1})"></td>\n`            
        }
        strHTML += `</tr>\n`
    }
    elBoard.innerHTML = strHTML
}

function cellClicked(elCell, i, j, leftClick) {
    if(leftClick === 1) {
        // console.log('left click') 
        // console.log('elCell=', elCell) 
        // console.log('i=' + i + " j=" + j)
        leftCellClicked(elCell)     
    }
    else if(leftClick === 0) {
        // console.log('right click')
        // console.log('elCell=', elCell) 
        // console.log('i=' + i + " j=" + j) 
        rightCellClicked(elCell)    
    }
}

function rightCellClicked(elCell) { 
    if(elCell.innerHTML === gCells.FLAG ) 
        elCell.innerHTML = ""
    else
        elCell.innerHTML = gCells.FLAG
}

function leftCellClicked(elCell) { 



    for (let i = 0; i < gTable.length; i++) {
        for( let j = 0; j < gTable.length; j++) {
            // console.log(elCell)
        }
    }
}

function checkGameOver() {
    console.log('game-over')
}

function expandShown(board, elCell, i, j) {

}






/*
window.addEventListener('contextmenu', function (e) {
    console.log('right clicked')
     e.preventDefault();
   }, false);
*/


// function onMouseDown (eventData) {
//     //    if (eventData.button === 0) {
//     //        alert("From JS: the (left?) button is down!")
//         console.log(eventData.button)
//     //    }
//       }  









