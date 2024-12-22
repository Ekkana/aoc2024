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
    console.log(path);

    const isValidPath = (line) => {};

    //sort it
    for (let i = 0; i < path.length; i++) {
        const line = path[i];
        for (let j = 0; j < line.length; j++) {
            path[i][j] = path[i][j].sort((a, b) => {
                if (j == 0) {
                    const order = ['Right', 'Down', 'Up', 'Left'];
                    return order.indexOf(a) - order.indexOf(b);
                }
                const order = ['Left', 'Down', 'Up', 'Right'];
                return order.indexOf(a) - order.indexOf(b);
            });
        }
    }
    console.log(path);

    const pathOnArrowPad1 = [];
    //for (const line of path) {
    for (let i = 0; i < path.length; i++) {
        const line = path[i];
        pathOnArrowPad1.push([]);
        let start = 'A';

        for (const path of line) {
            //console.log("Full path: ", path);
            for (const move of path) {
                //console.log("Moving from to ", start + "|" + move);
                if (start !== move) {
                    //console.log(pathsLookup[start + "|" + move]);
                    pathOnArrowPad1[i].push(pathsLookup[start + '|' + move]);
                    pathOnArrowPad1[i].push(['A']);
                    start = move;
                } else {
                    //console.log("Clicking A");
                    pathOnArrowPad1[i].push(['A']);
                }
            }
            //console.log("Clicking A - end of path");
            pathOnArrowPad1[i].push(pathsLookup[start + '|A']);
            pathOnArrowPad1[i].push(['A']);

            start = 'A';
        }
        pathOnArrowPad1[i] = pathOnArrowPad1[i].flat();
    }
    //console.log(pathOnArrowPad1);
    //console.log("Path on arrow pad 1");
    //console.log(pathOnArrowPad1);

    const pathOnArrowPad2 = [];
    //for (const line of path) {
    for (let i = 0; i < pathOnArrowPad1.length; i++) {
        const line = pathOnArrowPad1[i];
        pathOnArrowPad2.push([]);
        //console.log("Line: ", line);
        let start = 'A';

        for (const move of line) {
            //for (const move of path) {
            //console.log("Moving from to ", start + "|" + move);
            if (start !== move) {
                //console.log(pathsLookup2[start + "|" + move]);

                pathOnArrowPad2[i].push(pathsLookup2[start + '|' + move]);
                //pathOnArrowPad2[i].push(["A"]);
                start = move;
            } else {
                //console.log("Clicking A");
                pathOnArrowPad2[i].push(['A']);
            }
            //}
            //console.log("Clicking A - end of path");
            //pathOnArrowPad2[i].push(pathsLookup[start + "|A"]);
            //pathOnArrowPad2[i].push(["A"]);
            //
            //start = "A";
        }
        pathOnArrowPad2[i] = pathOnArrowPad2[i].flat();
    }
    //console.log("Path on arrow pad 2");
    //console.log(pathOnArrowPad2);
    //console.log(pathOnArrowPad2.length);
    for (let i = 0; i < pathOnArrowPad2.length; i++) {
        console.log(pathOnArrowPad2[i].length);
    }
    const numbers = [];

    for (const line of numericInput) {
        // number is 012A
        // need to get 12

        numbers.push(line.match(/\d+/g).map(Number));
    }
    console.log(numbers);

    let res = 0;

    for (let i = 0; i < pathOnArrowPad2.length; i++) {
        const num = numbers[i] * pathOnArrowPad2[i].length;
        console.log('Number: ', num);
        res += num;
    }
    console.log(res);
}
