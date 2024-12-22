import { parseInput } from './parseInput.js';

const WALL = '#';
const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

//part1();
part2();

function part2() {
    const [start, end, map] = parseInput('input1.txt');

    const run = (start, end, map) => {
        const distanceMap = [];
        for (let i = 0; i < map.length; i++) {
            distanceMap.push([]);
            for (let j = 0; j < map[i].length; j++) {
                distanceMap[i].push('.');
            }
        }

        const queue = [[start[0], start[1], 0, new Set()]];
        let answer = undefined;

        while (queue.length > 0) {
            const [curI, curJ, stepCount, path] = queue.shift();
            const key = `${curI},${curJ}`;

            if (path.has(key)) {
                continue;
            }
            if (map[curI][curJ] === WALL) {
                continue;
            }

            distanceMap[curI][curJ] = stepCount;

            if (curI === end[0] && curJ === end[1]) {
                answer = stepCount;
            }

            path.add(key);

            for (const [di, dj] of DIRECTIONS) {
                const newI = curI + di;
                const newJ = curJ + dj;

                queue.push([newI, newJ, stepCount + 1, path]);
            }
        }

        return [answer, distanceMap];
    };

    const [answer, distanceFromStart] = run(start, end, map);
    const [answer2, distanceFromEnd] = run(end, start, map);
    console.log(answer);

    const run2 = (start, maxLength) => {
        const visited = new Set();
        const queue = [[start[0], start[1], 0]];
        const jumpLengths = [];

        while (queue.length > 0) {
            const [curI, curJ, steps] = queue.shift();

            if (curI < 0 || curI >= map.length || curJ < 0 || curJ >= map[0].length) {
                continue;
            }
            if (steps > maxLength) {
                continue;
            }

            const key = `${curI},${curJ}`;
            if (visited.has(key)) {
                continue;
            }
            visited.add(key);
            if (map[curI][curJ] !== WALL) {
                const newJumpLength =
                    distanceFromStart[end[0]][end[1]] -
                    (distanceFromStart[start[0]][start[1]] + distanceFromEnd[curI][curJ] + steps);

                jumpLengths.push(newJumpLength);
            }

            for (const [di, dj] of DIRECTIONS) {
                const newI = curI + di;
                const newJ = curJ + dj;
                queue.push([newI, newJ, steps + 1]);
            }
        }

        return jumpLengths;
    };

    let str = '';

    for (let i = 0; i < distanceFromStart.length; i++) {
        for (let j = 0; j < distanceFromStart[i].length; j++) {
            str += `${distanceFromStart[i][j]}`.padStart(2) + ' ';
        }
        str += '\n';
    }
    console.log(str);

    let str2 = '';

    for (let i = 0; i < distanceFromEnd.length; i++) {
        for (let j = 0; j < distanceFromEnd[i].length; j++) {
            str2 += `${distanceFromEnd[i][j]}`.padStart(2) + ' ';
        }
        str2 += '\n';
    }
    console.log(str2);

    const allJumps = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] !== WALL) {
                const res = run2([i, j], 20);
                allJumps.push(...res);
            }
        }
    }
    const answer3 = allJumps.filter((jump) => jump >= 100).length;
    console.log(answer3);
}

function part1() {
    const run = (start, end, map) => {
        const visited = new Set();
        const queue = [[start[0], start[1], 0]];

        while (queue.length > 0) {
            const [curI, curJ, stepCount] = queue.shift();
            const key = `${curI},${curJ}`;

            if (visited.has(key)) {
                continue;
            }

            if (curI === end[0] && curJ === end[1]) {
                return stepCount;
            }
            if (map[curI][curJ] === WALL) {
                continue;
            }

            visited.add(key);

            for (const [di, dj] of DIRECTIONS) {
                const newI = curI + di;
                const newJ = curJ + dj;

                queue.push([newI, newJ, stepCount + 1]);
            }
        }
    };

    const [start, end, map] = parseInput('input1.txt');
    const baseLine = run(start, end, map);

    const results = new Map();

    for (let i = 1; i < map.length - 1; i++) {
        for (let j = 1; j < map[i].length - 1; j++) {
            if (map[i][j] === WALL) {
                const [start, end, map] = parseInput('input1.txt');
                map[i][j] = '.';
                const length = run(start, end, map);
                let key = baseLine - length;

                if (key) {
                    if (results.has(key)) {
                        results.set(key, results.get(key) + 1);
                    } else {
                        results.set(key, 1);
                    }
                }
            }
        }
    }

    const moreThan = 100;
    let total = 0;

    for (const [key, value] of results) {
        if (key >= moreThan) {
            total += value;
        }
    }

    console.log(total);
}
