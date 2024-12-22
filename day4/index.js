const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim();

const splitLines = input.split('\n');
const arr = splitLines.map((line) => line.split(''));

// Part 1
const word = 'XMAS';
const directions = {
    down: [
        [0, 1],
        [0, 2],
        [0, 3],
    ],
    up: [
        [0, -1],
        [0, -2],
        [0, -3],
    ],
    left: [
        [-1, 0],
        [-2, 0],
        [-3, 0],
    ],
    right: [
        [1, 0],
        [2, 0],
        [3, 0],
    ],
    upLeft: [
        [-1, -1],
        [-2, -2],
        [-3, -3],
    ],
    upRight: [
        [1, -1],
        [2, -2],
        [3, -3],
    ],
    downLeft: [
        [-1, 1],
        [-2, 2],
        [-3, 3],
    ],
    downRight: [
        [1, 1],
        [2, 2],
        [3, 3],
    ],
};
//const startingNodes = [];

const checkDirections = (i, k) => {
    let numberOfWords = 0;

    for (let direction in directions) {
        let newWord = word[0];
        for (let j = 0; j < directions[direction].length; j++) {
            const x = i + directions[direction][j][0];
            const y = k + directions[direction][j][1];

            if (arr[x] && arr[x][y]) {
                newWord += arr[x][y];
            }
        }

        if (newWord === word) {
            numberOfWords++;
        }
    }

    return numberOfWords;
};

let totalWords = 0;
for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < arr[i].length; k++) {
        if (arr[i][k] === word[0]) {
            totalWords += checkDirections(i, k);
        }
    }
}

// Part 2
const directions2 = {
    leftDiagonal: [
        [-1, -1],
        [1, 1],
    ],
    rightDiagonal: [
        [-1, 1],
        [1, -1],
    ],
};
const center = 'A';
const word2 = 'MS';

const checkDirections2 = (i, k) => {
    let numberOfWords = 0;

    for (let direction in directions2) {
        let newWord = '';
        for (let j = 0; j < directions2[direction].length; j++) {
            const x = i + directions2[direction][j][0];
            const y = k + directions2[direction][j][1];

            if (arr[x] && arr[x][y]) {
                newWord += arr[x][y];
            }
        }

        if (newWord === word2 || newWord === word2.split('').reverse().join('')) {
            numberOfWords++;
        }
    }

    return numberOfWords === 2 ? 1 : 0;
};

let totalWords2 = 0;
for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < arr[i].length; k++) {
        if (arr[i][k] === center) {
            totalWords2 += checkDirections2(i, k);
        }
    }
}

console.log(totalWords);
console.log(totalWords2);
