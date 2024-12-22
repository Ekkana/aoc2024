const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8').toString().trim();

const splitLines = input.split('\n');
const arr = splitLines.map((line) => line.split(''));

const startSymbol = '^';
const wallSymbol = '#';
const directions = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
};

const getStartingPosition = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const index = arr[i].indexOf(startSymbol);
        if (index !== -1) {
            return [i, index];
        }
    }
    return [-1, -1];
};
const getNewDirection = (currentDirection) => {
    if (currentDirection === 'up') {
        return 'right';
    }
    if (currentDirection === 'right') {
        return 'down';
    }
    if (currentDirection === 'down') {
        return 'left';
    }
    return 'up';
};

// Part 1
let currentDirection = 'up';
const visited = new Set();
let [row, col] = getStartingPosition(arr);

console.time('time');
while (true) {
    const newRow = row + directions[currentDirection][0];
    const newCol = col + directions[currentDirection][1];

    if (!arr[newRow] || !arr[newRow][newCol]) {
        break;
    }
    if (arr[newRow][newCol] === wallSymbol) {
        currentDirection = getNewDirection(currentDirection);
    } else {
        row = newRow;
        col = newCol;
        visited.add(`${row},${col}`);
    }
}
console.timeEnd('time');

console.log(visited.size);

// Part 2
let [startRow, startCol] = getStartingPosition(arr);
let potentialNewCorners = 0;

console.time('time');

for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < arr[i].length; k++) {
        let currentDirection2 = 'up';
        const corners = new Set();
        const newWallPosition = [i, k];
        let row2 = startRow;
        let col2 = startCol;

        while (true) {
            const newRow = row2 + directions[currentDirection2][0];
            const newCol = col2 + directions[currentDirection2][1];

            if (!arr[newRow] || !arr[newRow][newCol]) {
                break;
            }
            if (
                arr[newRow][newCol] === wallSymbol ||
                (newRow === newWallPosition[0] && newCol === newWallPosition[1])
            ) {
                if (corners.has(`${newRow},${newCol}${currentDirection2}`)) {
                    potentialNewCorners++;
                    break;
                }

                corners.add(`${newRow},${newCol}${currentDirection2}`);
                currentDirection2 = getNewDirection(currentDirection2);
            } else {
                row2 = newRow;
                col2 = newCol;
            }
        }
    }
}

console.timeEnd('time');

console.log(potentialNewCorners);
