const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8').toString().trim();

const splitLines = input.split('\n');
const arr = splitLines.map((line) => line.split('').map((x) => parseInt(x)));

const solution1Part2 = (arr) => {
    const directionsLookup = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    function findPath(arr, startI, startK, curValue, total, visitedNines = []) {
        if (arr[startI][startK] === 9) {
            total += 1;
        }

        for (let i = 0; i < directionsLookup.length; i++) {
            const [x, y] = directionsLookup[i];
            const nextI = startI + x;
            const nextK = startK + y;

            if (!arr[nextI] || !arr[nextI][nextK]) {
                continue;
            }

            if (arr[nextI][nextK] === curValue + 1) {
                total = Math.max(
                    total,
                    findPath(arr, nextI, nextK, arr[nextI][nextK], total, visitedNines),
                );
            }
        }
        return total;
    }

    let score = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].length; k++) {
            if (arr[i][k] === 0) {
                const res = findPath(arr, i, k, 0, 0);
                score += res;
            }
        }
    }

    console.log(score);
};

const solution1Part1 = (arr) => {
    const directionsLookup = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    function findPath(arr, startI, startK, curValue, total, visitedNines = []) {
        if (arr[startI][startK] === 9) {
            if (!visitedNines.includes(`${startI}, ${startK}`)) {
                visitedNines.push(`${startI}, ${startK}`);
                total += 1;
            }
        }

        for (let i = 0; i < directionsLookup.length; i++) {
            const [x, y] = directionsLookup[i];
            const nextI = startI + x;
            const nextK = startK + y;

            if (!arr[nextI] || !arr[nextI][nextK]) {
                continue;
            }

            if (arr[nextI][nextK] === curValue + 1) {
                total = Math.max(
                    total,
                    findPath(arr, nextI, nextK, arr[nextI][nextK], total, visitedNines),
                );
            }
        }
        return total;
    }

    //console.log("result: ", findPath(arr, 0, 4, 0, 0));
    let score = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].length; k++) {
            if (arr[i][k] === 0) {
                score += findPath(arr, i, k, 0, 0);
            }
        }
    }

    console.log(score);
};

solution1Part1(arr);
solution1Part2(arr);
