import { parseInput } from './parseInput.js';

const numericKeyPad = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [undefined, 0, 'A'],
];
const numericKeyPadStart = [3, 2];

const directionsKeyPad = [
    [undefined, 'Up', 'A'],
    ['Left', 'Down', 'Right'],
];
const directionsKeyPadStart = [0, 2];

const pathsLookup2 = {
    'A|Up': ['Left', 'A'],
    'A|Right': ['Down', 'A'],
    'A|Down': ['Left', 'Down', 'A'],
    'A|Left': ['Down', 'Left', 'Left', 'A'],
    'Up|A': ['Right', 'A'],
    'Up|Right': ['Down', 'Right', 'A'],
    'Up|Down': ['Down', 'A'],
    'Up|Left': ['Down', 'Left', 'A'],
    'Left|Down': ['Right', 'A'],
    'Left|Right': ['Right', 'Right', 'A'],
    'Left|Up': ['Right', 'Up', 'A'],
    'Left|A': ['Right', 'Right', 'Up', 'A'],
    'Down|Up': ['Up', 'A'],
    'Down|Right': ['Right', 'A'],
    'Down|Left': ['Left', 'A'],
    'Down|A': ['Up', 'Right', 'A'],
    'Right|Up': ['Left', 'Up', 'A'],
    'Right|Down': ['Left', 'A'],
    'Right|Left': ['Left', 'Left', 'A'],
    'Right|A': ['Up', 'A'],
};

const pathsLookup = {
    'A|Up': ['Left'],
    'A|Right': ['Down'],
    'A|Down': ['Left', 'Down'],
    'A|Left': ['Down', 'Left', 'Left'],
    'Up|A': ['Right'],
    'Up|Right': ['Down', 'Right'],
    'Up|Down': ['Down'],
    'Up|Left': ['Down', 'Left'],
    'Left|Down': ['Right'],
    'Left|Right': ['Right', 'Right'],
    'Left|Up': ['Right', 'Up'],
    'Left|A': ['Right', 'Right', 'Up'],
    'Down|Up': ['Up'],
    'Down|Right': ['Right'],
    'Down|Left': ['Left'],
    'Down|A': ['Up', 'Right'],
    'Right|Up': ['Left', 'Up'],
    'Right|Down': ['Left'],
    'Right|Left': ['Left', 'Left'],
    'Right|A': ['Up'],
};

const DIRECTIONS = {
    Left: [0, -1],
    Right: [0, 1],
    Up: [-1, 0],
    Down: [1, 0],
};

part1();
part2();

function part2() {
    const numericInput = parseInput('input1.txt');

    const findNumericPath = (start, end) => {
        const queue = [[start[0], start[1], []]];
        const visited = new Set();

        while (queue.length > 0) {
            const [x, y, path] = queue.shift();
            const key = `${x},${y}`;

            if (
                typeof numericKeyPad[x] === 'undefined' ||
                typeof numericKeyPad[x][y] === 'undefined' ||
                visited.has(key)
            ) {
                continue;
            }

            //console.log(x, y, path, end);
            if (x === end[0] && y === end[1]) {
                return path;
            }

            visited.add(key);

            for (const [direction, [dx, dy]] of Object.entries(DIRECTIONS)) {
                const newX = x + dx;
                const newY = y + dy;

                const newPath = [...path, direction];
                queue.push([newX, newY, newPath]);
            }
        }
    };

    const parseNumericInput = (letter) => {
        if (letter === 'A') {
            return 'A';
        }
        return parseInt(letter);
    };
    const findIndex = (keyPad, value) => {
        for (let i = 0; i < keyPad.length; i++) {
            for (let j = 0; j < keyPad[i].length; j++) {
                if (keyPad[i][j] == value) {
                    return [i, j];
                }
            }
        }
    };

    const path = [];
    for (let i = 0; i < numericInput.length; i++) {
        path.push([]);
        for (let j = 0; j < numericInput[i].length; j++) {
            const numericPath = findNumericPath(
                j === 0
                    ? numericKeyPadStart
                    : findIndex(numericKeyPad, parseNumericInput(numericInput[i][j - 1])),
                findIndex(numericKeyPad, parseNumericInput(numericInput[i][j])),
            );
            path[i].push(numericPath);
        }
    }

    const isValidPath = (line, start) => {
        let curPoint = [...start];

        for (let i = 0; i < line.length; i++) {
            const dir = line[i];
            const [dx, dy] = DIRECTIONS[dir];
            const [x, y] = curPoint;
            const newX = x + dx;
            const newY = y + dy;

            if (
                typeof numericKeyPad[newX] === 'undefined' ||
                typeof numericKeyPad[newX][newY] === 'undefined'
            ) {
                return false;
            }
            curPoint = [newX, newY];
        }
        return true;
    };

    //sort it
    for (let i = 0; i < path.length; i++) {
        const line = path[i];
        for (let j = 0; j < line.length; j++) {
            path[i][j] = path[i][j].sort((a, b) => {
                const order = ['Left', 'Down', 'Up', 'Right'];
                return order.indexOf(a) - order.indexOf(b);
            });

            const startNodeSymbol = j === 0 ? 'A' : numericInput[i][j - 1];
            let startNodeIndex = [3, 2];

            if (j !== 0) {
                for (let x = 0; x < numericKeyPad.length; x++) {
                    for (let y = 0; y < numericKeyPad[x].length; y++) {
                        if (
                            parseNumericInput(numericKeyPad[x][y]) ==
                            parseNumericInput(startNodeSymbol)
                        ) {
                            startNodeIndex = [x, y];
                        }
                    }
                }
            }

            if (!isValidPath(path[i][j], startNodeIndex)) {
                path[i][j] = path[i][j].sort((a, b) => {
                    const order = ['Right', 'Down', 'Up', 'Left'];
                    return order.indexOf(a) - order.indexOf(b);
                });
            }
        }
    }

    const pathOnArrowPad1 = [];
    for (let i = 0; i < path.length; i++) {
        const line = path[i];
        pathOnArrowPad1.push([]);
        let start = 'A';

        for (const path of line) {
            for (const move of path) {
                if (start !== move) {
                    pathOnArrowPad1[i].push(pathsLookup[start + '|' + move]);
                    pathOnArrowPad1[i].push(['A']);
                    start = move;
                } else {
                    pathOnArrowPad1[i].push(['A']);
                }
            }
            pathOnArrowPad1[i].push(pathsLookup[start + '|A']);
            pathOnArrowPad1[i].push(['A']);

            start = 'A';
        }
        pathOnArrowPad1[i] = pathOnArrowPad1[i].flat();
    }

    //const cache = {};
    //const getPath = (previousPath) => {
    //    const newPath = [];
    //    for (let i = 0; i < previousPath.length; i++) {
    //        const line = previousPath[i];
    //
    //        newPath.push([]);
    //        let start = 'A';
    //        let out = [];
    //
    //        const key = `${line.join('|')}`;
    //
    //        if (cache[key]) {
    //            out = cache[key];
    //        } else {
    //            for (const move of line) {
    //                if (start !== move) {
    //                    out.push(pathsLookup2[start + '|' + move]);
    //                    start = move;
    //                } else {
    //                    out.push('A');
    //                }
    //            }
    //            cache[key] = out.flat();
    //        }
    //
    //        newPath[i].push(out.flat());
    //        newPath[i] = newPath[i].flat();
    //    }
    //    return newPath;
    //};
    //
    //let endPath = [...pathOnArrowPad1];
    //for (let i = 0; i < 1; i++) {
    //    endPath = getPath(endPath);
    //}

    const cache = {};
    const getPath = (initialPath, targetDepth, previousPath, start, curDepth = 0) => {
        if (curDepth === targetDepth) {
            return previousPath;
        }

        const key = previousPath.join('|');

        if (cache[key]) {
            console.log('hit');
            return cache[key];
        }

        let newPath = [];

        let start2 = start;

        //console.log('start', start);
        //console.log('start2', start2);
        for (const move of previousPath) {
            if (start2 !== move) {
                //console.log(start, move);
                //console.log(pathsLookup2[start2 + '|' + move]);
                newPath.push(pathsLookup2[start2 + '|' + move]);
                start2 = move;
            } else {
                newPath.push('A');
            }
        }

        cache[key] = newPath.flat();
        newPath = cache[key];
        console.log(curDepth);

        return getPath(initialPath, targetDepth, newPath, start2, curDepth + 1);
    };

    let endPath = [...pathOnArrowPad1];
    const res2 = [];
    const depth = 24;
    //console.log('endPath', endPath);
    for (let i = 0; i < endPath.length; i++) {
        res2.push([]);
        for (let j = 0; j < endPath[i].length; j++) {
            const start = j === 0 ? 'A' : endPath[i][j - 1];
            const test = getPath(endPath[i][j], depth, [endPath[i][j]], start);
            //console.log('inpu', endPath[i][j]);
            //console.log('test', test);
            console.log(j);
            res2[i].push(test);
        }
        endPath[i] = res2[i].flat();
        endPath[i] = endPath[i].flat();
    }
    //console.log(endPath);

    const numbers = [];
    for (const line of numericInput) {
        numbers.push(line.match(/\d+/g).map(Number));
    }

    let res = 0;
    for (let i = 0; i < endPath.length; i++) {
        const num = numbers[i] * endPath[i].length;
        res += num;
    }
    console.log(res);
}

function part1() {
    const numericInput = parseInput('input1.txt');

    const findNumericPath = (start, end) => {
        const queue = [[start[0], start[1], []]];
        const visited = new Set();

        while (queue.length > 0) {
            const [x, y, path] = queue.shift();
            const key = `${x},${y}`;

            if (
                typeof numericKeyPad[x] === 'undefined' ||
                typeof numericKeyPad[x][y] === 'undefined' ||
                visited.has(key)
            ) {
                continue;
            }

            //console.log(x, y, path, end);
            if (x === end[0] && y === end[1]) {
                return path;
            }

            visited.add(key);

            for (const [direction, [dx, dy]] of Object.entries(DIRECTIONS)) {
                const newX = x + dx;
                const newY = y + dy;

                const newPath = [...path, direction];
                queue.push([newX, newY, newPath]);
            }
        }
    };

    const parseNumericInput = (letter) => {
        if (letter === 'A') {
            return 'A';
        }
        return parseInt(letter);
    };
    const findIndex = (keyPad, value) => {
        for (let i = 0; i < keyPad.length; i++) {
            for (let j = 0; j < keyPad[i].length; j++) {
                if (keyPad[i][j] == value) {
                    return [i, j];
                }
            }
        }
    };

    const path = [];
    for (let i = 0; i < numericInput.length; i++) {
        path.push([]);
        for (let j = 0; j < numericInput[i].length; j++) {
            const numericPath = findNumericPath(
                j === 0
                    ? numericKeyPadStart
                    : findIndex(numericKeyPad, parseNumericInput(numericInput[i][j - 1])),
                findIndex(numericKeyPad, parseNumericInput(numericInput[i][j])),
            );
            path[i].push(numericPath);
        }
    }

    const isValidPath = (line, start) => {
        let curPoint = [...start];

        for (let i = 0; i < line.length; i++) {
            const dir = line[i];
            const [dx, dy] = DIRECTIONS[dir];
            const [x, y] = curPoint;
            const newX = x + dx;
            const newY = y + dy;

            if (
                typeof numericKeyPad[newX] === 'undefined' ||
                typeof numericKeyPad[newX][newY] === 'undefined'
            ) {
                return false;
            }
            curPoint = [newX, newY];
        }
        return true;
    };

    //sort it
    for (let i = 0; i < path.length; i++) {
        const line = path[i];
        for (let j = 0; j < line.length; j++) {
            path[i][j] = path[i][j].sort((a, b) => {
                const order = ['Left', 'Down', 'Up', 'Right'];
                return order.indexOf(a) - order.indexOf(b);
            });

            const startNodeSymbol = j === 0 ? 'A' : numericInput[i][j - 1];
            let startNodeIndex = [3, 2];

            if (j !== 0) {
                for (let x = 0; x < numericKeyPad.length; x++) {
                    for (let y = 0; y < numericKeyPad[x].length; y++) {
                        if (
                            parseNumericInput(numericKeyPad[x][y]) ==
                            parseNumericInput(startNodeSymbol)
                        ) {
                            startNodeIndex = [x, y];
                        }
                    }
                }
            }

            if (!isValidPath(path[i][j], startNodeIndex)) {
                path[i][j] = path[i][j].sort((a, b) => {
                    const order = ['Right', 'Down', 'Up', 'Left'];
                    return order.indexOf(a) - order.indexOf(b);
                });
            }
        }
    }

    const pathOnArrowPad1 = [];
    for (let i = 0; i < path.length; i++) {
        const line = path[i];
        pathOnArrowPad1.push([]);
        let start = 'A';

        for (const path of line) {
            for (const move of path) {
                if (start !== move) {
                    pathOnArrowPad1[i].push(pathsLookup[start + '|' + move]);
                    pathOnArrowPad1[i].push(['A']);
                    start = move;
                } else {
                    pathOnArrowPad1[i].push(['A']);
                }
            }
            pathOnArrowPad1[i].push(pathsLookup[start + '|A']);
            pathOnArrowPad1[i].push(['A']);

            start = 'A';
        }
        pathOnArrowPad1[i] = pathOnArrowPad1[i].flat();
    }

    const pathOnArrowPad2 = [];
    for (let i = 0; i < pathOnArrowPad1.length; i++) {
        const line = pathOnArrowPad1[i];
        pathOnArrowPad2.push([]);
        let start = 'A';

        for (const move of line) {
            if (start !== move) {
                pathOnArrowPad2[i].push(pathsLookup2[start + '|' + move]);
                start = move;
            } else {
                pathOnArrowPad2[i].push(['A']);
            }
        }
        pathOnArrowPad2[i] = pathOnArrowPad2[i].flat();
    }

    console.log(pathOnArrowPad2);
    const numbers = [];
    for (const line of numericInput) {
        numbers.push(line.match(/\d+/g).map(Number));
    }

    let res = 0;
    for (let i = 0; i < pathOnArrowPad2.length; i++) {
        const num = numbers[i] * pathOnArrowPad2[i].length;
        res += num;
    }
    console.log(res);
}
