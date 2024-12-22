import { parseInput } from './parseInput.js';

const posArray = parseInput('input1.txt');
//const mapSize = [7, 7];
//const amountFallen = 12;
const amountFallen = 1024;
const mapSize = [71, 71];

const start = [0, 0];
const end = [mapSize[0] - 1, mapSize[1] - 1];

const possibleMoves = {
    left: [0, -1],
    right: [0, 1],
    up: [-1, 0],
    down: [1, 0],
};

console.time('part2');
part2();
console.timeEnd('part2');

function part2() {
    console.log('part2');

    const run = (endIndex) => {
        const map = [];

        for (let i = 0; i < mapSize[0]; i++) {
            map.push([]);
            for (let j = 0; j < mapSize[1]; j++) {
                map[i].push(true);
            }
        }
        for (let i = 0; i < endIndex; i++) {
            map[posArray[i][1]][posArray[i][0]] = false;
        }

        const visited = [];
        for (let i = 0; i < mapSize[0]; i++) {
            visited.push([]);
            for (let j = 0; j < mapSize[1]; j++) {
                visited[i].push(false);
            }
        }

        const getWeight = (i, j) => {
            return Math.abs(i - end[0]) + Math.abs(j - end[1]);
        };

        const queue = [[start[0], start[1], 0, 0]];

        while (true) {
            if (queue.length <= 0) {
                return false;
            }
            //queue.sort((a, b) => a[3] - b[3]); // implemented A* but it is slow

            const [x, y, steps] = queue.shift();
            if (x === end[0] && y === end[1]) {
                return true;
            }
            if (x < 0 || x >= mapSize[0] || y < 0 || y >= mapSize[1] || !map[x][y]) {
                continue;
            }
            if (visited[x][y]) {
                continue;
            }
            visited[x][y] = true;

            queue.push([
                x + possibleMoves.left[0],
                y + possibleMoves.left[1],
                steps + 1,
                steps + 1 + getWeight(x + possibleMoves.left[0], y + possibleMoves.left[1]),
            ]);
            queue.push([
                x + possibleMoves.right[0],
                y + possibleMoves.right[1],
                steps + 1,
                steps + 1 + getWeight(x + possibleMoves.right[0], y + possibleMoves.right[1]),
            ]);
            queue.push([x + possibleMoves.up[0], y + possibleMoves.up[1], steps + 1]);
            queue.push([
                x + possibleMoves.down[0],
                y + possibleMoves.down[1],
                steps + 1,
                steps + 1 + getWeight(x + possibleMoves.down[0], y + possibleMoves.down[1]),
            ]);
        }
    };

    let startIndex = amountFallen;
    let endIndex = posArray.length;
    let middlePoint = 0;

    while (endIndex - startIndex > 1) {
        middlePoint = Math.floor((startIndex + endIndex) / 2);

        if (run(middlePoint)) {
            startIndex = middlePoint;
        } else {
            endIndex = middlePoint;
        }
    }

    console.log(posArray[startIndex]);
}

console.time('part1');
part1();
console.timeEnd('part1');

function part1() {
    console.log('part1');
    const map = [];

    for (let i = 0; i < mapSize[0]; i++) {
        map.push([]);
        for (let j = 0; j < mapSize[1]; j++) {
            map[i].push(true);
        }
    }
    for (let i = 0; i < amountFallen; i++) {
        if (
            posArray[i][0] < 0 ||
            posArray[i][0] >= mapSize[0] ||
            posArray[i][1] < 0 ||
            posArray[i][1] >= mapSize[1]
        ) {
            continue;
        }
        map[posArray[i][1]][posArray[i][0]] = false;
    }

    const visited = [];
    for (let i = 0; i < mapSize[0]; i++) {
        visited.push([]);
        for (let j = 0; j < mapSize[1]; j++) {
            visited[i].push(false);
        }
    }

    const queue = [[start[0], start[1], 0]];

    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();
        if (x === end[0] && y === end[1]) {
            console.log(steps);
            break;
        }
        if (x < 0 || x >= mapSize[0] || y < 0 || y >= mapSize[1] || !map[x][y]) {
            continue;
        }
        if (visited[x][y]) {
            continue;
        }
        visited[x][y] = true;

        queue.push([x + possibleMoves.left[0], y + possibleMoves.left[1], steps + 1]);
        queue.push([x + possibleMoves.right[0], y + possibleMoves.right[1], steps + 1]);
        queue.push([x + possibleMoves.up[0], y + possibleMoves.up[1], steps + 1]);
        queue.push([x + possibleMoves.down[0], y + possibleMoves.down[1], steps + 1]);
    }
}
