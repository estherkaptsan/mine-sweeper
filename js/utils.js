'use strict'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getEmptyCell() {
    let nums = []

    for (let i = 0; i < gTable.length; i++) {
        for (let j = 0; j < gTable[i].length; j++) {
            if (gTable[i][j] === EMPTY) {
                nums.push({ i, j })
            }
        }
    }
    const randIdx = getRandomInt(0, nums.length - 1)
    const num = nums.splice(randIdx, 1)
    return num[0]
}
