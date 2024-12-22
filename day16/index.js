const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input3.txt'), 'utf8').toString().trim();

const map = input.split('\n');
let start = [];
let end = [];
const startDirection = 'east';
const WALL = '#';
const EMPTY = '.';
const MOVES = {
    north: [-1, 0],
    east: [0, 1],
    south: [1, 0],
    west: [0, -1],
};

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === 'S') {
            start = [i, j];
            map[i][j] = '.';
        }
        if (map[i][j] === 'E') {
            end = [i, j];
            map[i][j] = '.';
        }
    }
}

const turnOptionsLookup = {
    north: ['east', 'west'],
    east: ['north', 'south'],
    south: ['east', 'west'],
    west: ['north', 'south'],
};

part1_bfs();
part2_bfs();

function part2_bfs() {
    const queue = [[start[0], start[1], startDirection, 0, [[start[0], start[1]]]]];
    const visited = new Map();
    const solutions = [];
    let totalLength = 0;

    console.time('bfs');
    while (queue.length > 0) {
        // prioritize small score
        queue.sort((a, b) => a[3] - b[3]);

        const [x, y, direction, score, path] = queue.shift();
        const key = `${x},${y},${direction}`;

        if (map[x][y] === WALL || visited.has(key)) continue;
        visited.set(key, score);

        queue.push([
            x + MOVES[direction][0],
            y + MOVES[direction][1],
            direction,
            score + 1,
            [...path, [x + MOVES[direction][0], y + MOVES[direction][1]]],
        ]);

        let turnOptions = turnOptionsLookup[direction];
        if (solutions.length > 0) {
            turnOptions = [turnOptions[1], turnOptions[0]];
        }
        queue.push([
            x + MOVES[turnOptions[0]][0],
            y + MOVES[turnOptions[0]][1],
            turnOptions[0],
            score + 1001,
            [...path, [x + MOVES[turnOptions[0]][0], y + MOVES[turnOptions[0]][1]]],
        ]);
        queue.push([
            x + MOVES[turnOptions[1]][0],
            y + MOVES[turnOptions[1]][1],
            turnOptions[1],
            score + 1001,
            [...path, [x + MOVES[turnOptions[1]][0], y + MOVES[turnOptions[1]][1]]],
        ]);

        if (x === end[0] && y === end[1]) {
            solutions.push({ score, path });
        }
    }
    console.log(JSON.stringify(solutions));
    console.timeEnd('bfs');
}

function part1_bfs() {
    const queue = [[start[0], start[1], startDirection, 0, [[start[0], start[1]]]]];
    const visited = new Map();

    console.time('bfs');
    while (queue.length > 0) {
        // prioritize small score
        queue.sort((a, b) => a[3] - b[3]);

        const [x, y, direction, score, path] = queue.shift();
        const key = `${x},${y},${direction}`;

        if (map[x][y] === WALL || visited.has(key)) continue;
        visited.set(key, score);

        queue.push([
            x + MOVES[direction][0],
            y + MOVES[direction][1],
            direction,
            score + 1,
            [...path, [x + MOVES[direction][0], y + MOVES[direction][1]]],
        ]);

        const turnOptions = turnOptionsLookup[direction];
        queue.push([
            x + MOVES[turnOptions[0]][0],
            y + MOVES[turnOptions[0]][1],
            turnOptions[0],
            score + 1001,
            [...path, [x + MOVES[turnOptions[0]][0], y + MOVES[turnOptions[0]][1]]],
        ]);
        queue.push([
            x + MOVES[turnOptions[1]][0],
            y + MOVES[turnOptions[1]][1],
            turnOptions[1],
            score + 1001,
            [...path, [x + MOVES[turnOptions[1]][0], y + MOVES[turnOptions[1]][1]]],
        ]);

        if (x === end[0] && y === end[1]) {
            console.log(score);
            //console.log(path);
            //console.log(path.length);
            break;
        }
    }
    console.timeEnd('bfs');
}

function part1_dfs() {
    const getScore = (pos, direction, score, visited, path) => {
        //console.log(pos, direction, score);
        const key = `${pos[0]},${pos[1]},${direction}`;

        //console.log(visited);
        if (visited.has(key)) return { score, finished: false, path };

        const localVisited = new Set(visited);
        localVisited.add(key);
        const localPath = [...path, [pos[0], pos[1]]];

        if (map[pos[0]][pos[1]] === WALL) {
            return { score, finished: false, path };
        }

        if (pos[0] === end[0] && pos[1] === end[1]) {
            return { score, finished: true, localPath };
        }

        const forward = getScore(
            [pos[0] + MOVES[direction][0], pos[1] + MOVES[direction][1]],
            direction,
            score + 1,
            localVisited,

            localPath,
        );

        const turnOptions = getTurnOptions(direction);
        const turn1 = getScore(
            [pos[0] + MOVES[turnOptions[0]][0], pos[1] + MOVES[turnOptions[0]][1]],
            turnOptions[0],
            score + 1001,
            localVisited,
            localPath,
        );
        const turn2 = getScore(
            [pos[0] + MOVES[turnOptions[1]][0], pos[1] + MOVES[turnOptions[1]][1]],
            turnOptions[1],
            score + 1001,
            localVisited,
            localPath,
        );

        // return the smallest finished score
        const scores = [forward, turn1, turn2].filter((x) => x.finished);

        if (scores.length === 0) {
            return { score: 0, finished: false };
        }

        // find the item with smallest score
        const item = scores.reduce((prev, current) => {
            return prev.score < current.score ? prev : current;
        });

        return item;
    };

    const visited = new Set();
    const result = getScore(start, startDirection, 0, visited, []);
    console.log(result);
}
