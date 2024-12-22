const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8').toString().trim();

part1();
part2();

function part2() {
    const [mapIn, movesIn] = input.split('\n\n');
    const map = [];
    const START_SYMBOL = '@';
    const WALL_SYMBOL = '#';
    const BOX_SYMBOL = 'O';
    const EMPTY_SYMBOL = '.';
    const BOX_START_SYMBOL = '[';
    const BOX_END_SYMBOL = ']';

    let startPosition = [];
    for (let line of mapIn.split('\n')) {
        map.push([]);
        for (let char of line) {
            if (char === START_SYMBOL) {
                startPosition = [map.length - 1, map[map.length - 1].length];
            }
            if (char === EMPTY_SYMBOL || char === START_SYMBOL) {
                map[map.length - 1].push(EMPTY_SYMBOL);
                map[map.length - 1].push(EMPTY_SYMBOL);
            } else if (char === WALL_SYMBOL) {
                map[map.length - 1].push(char);
                map[map.length - 1].push(char);
            } else if (char === BOX_SYMBOL) {
                map[map.length - 1].push(BOX_START_SYMBOL);
                map[map.length - 1].push(BOX_END_SYMBOL);
            }
        }
    }

    const movesLookup = {
        '<': [0, -1],
        '>': [0, 1],
        '^': [-1, 0],
        v: [1, 0],
    };

    const moves = movesIn
        .split('\n')
        .join('')
        .split('')
        .map((move) => {
            return movesLookup[move];
        });

    const isBoxMovingHorizontal = (position, move) => {
        let newPosition = [position[0] + move[0], position[1] + move[1]];

        while (true) {
            if (map[newPosition[0]][newPosition[1]] === WALL_SYMBOL) {
                return false;
            }
            if (map[newPosition[0]][newPosition[1]] === EMPTY_SYMBOL) {
                return true;
            }

            newPosition = [newPosition[0] + move[0], newPosition[1] + move[1]];
        }
    };

    const isBoxMovingVertical = (position, move) => {
        if (map[position[0]][position[1]] === WALL_SYMBOL) {
            return false;
        }
        if (map[position[0]][position[1]] === EMPTY_SYMBOL) {
            return true;
        }

        let boxLeftHalfPosition = [];
        let boxRightHalfPosition = [];

        if (map[position[0]][position[1]] === BOX_START_SYMBOL) {
            boxLeftHalfPosition = position;
            boxRightHalfPosition = [position[0], position[1] + 1];
        } else {
            boxLeftHalfPosition = [position[0], position[1] - 1];
            boxRightHalfPosition = position;
        }

        let newLeftHalfPosition = [
            boxLeftHalfPosition[0] + move[0],
            boxLeftHalfPosition[1] + move[1],
        ];
        let newRightHalfPosition = [
            boxRightHalfPosition[0] + move[0],
            boxRightHalfPosition[1] + move[1],
        ];

        return (
            isBoxMovingVertical(newLeftHalfPosition, move) &&
            isBoxMovingVertical(newRightHalfPosition, move)
        );
    };

    const isBoxMoving = (position, move) => {
        const isHorizontal = move[1] !== 0;
        return isHorizontal
            ? isBoxMovingHorizontal(position, move)
            : isBoxMovingVertical(position, move);
    };

    const moveBoxHorizontal = (position, move) => {
        let newPosition = [...position];
        const boxesArray = [];

        while (map[newPosition[0]][newPosition[1]] !== EMPTY_SYMBOL) {
            boxesArray.push([newPosition, map[newPosition[0]][newPosition[1]]]);
            newPosition = [newPosition[0] + move[0], newPosition[1] + move[1]];
        }

        map[position[0]][position[1]] = EMPTY_SYMBOL;
        let newInputPosition = [position[0] + move[0], position[1] + move[1]];
        for (let box of boxesArray) {
            map[newInputPosition[0]][newInputPosition[1]] = box[1];
            newInputPosition = [newInputPosition[0] + move[0], newInputPosition[1] + move[1]];
        }
    };

    const moveBoxVertical = (position, move) => {
        const getBoxPositions = (position, move, boxPositions) => {
            if (
                map[position[0]][position[1]] !== BOX_START_SYMBOL &&
                map[position[0]][position[1]] !== BOX_END_SYMBOL
            ) {
                return boxPositions;
            }

            let boxLeftHalfPosition = [];
            let boxRightHalfPosition = [];

            if (map[position[0]][position[1]] === BOX_START_SYMBOL) {
                boxLeftHalfPosition = position;
                boxRightHalfPosition = [position[0], position[1] + 1];
            } else {
                boxLeftHalfPosition = [position[0], position[1] - 1];
                boxRightHalfPosition = position;
            }
            if (
                boxPositions[boxLeftHalfPosition[0]] &&
                boxPositions[boxLeftHalfPosition[0]].includes(boxLeftHalfPosition[1]) &&
                boxPositions[boxRightHalfPosition[0]] &&
                boxPositions[boxRightHalfPosition[0]].includes(boxRightHalfPosition[1])
            ) {
                return boxPositions;
            }

            if (!boxPositions[boxLeftHalfPosition]) {
                boxPositions[boxLeftHalfPosition[0]] = [];
            }
            if (!boxPositions[boxRightHalfPosition]) {
                boxPositions[boxRightHalfPosition[0]] = [];
            }
            boxPositions[boxLeftHalfPosition[0]].push(boxLeftHalfPosition[1]);
            boxPositions[boxRightHalfPosition[0]].push(boxRightHalfPosition[1]);

            let newLeftHalfPosition = [
                boxLeftHalfPosition[0] + move[0],
                boxLeftHalfPosition[1] + move[1],
            ];
            let newRightHalfPosition = [
                boxRightHalfPosition[0] + move[0],
                boxRightHalfPosition[1] + move[1],
            ];

            const positionsLeft = getBoxPositions(newLeftHalfPosition, move, boxPositions);
            const positionsRight = getBoxPositions(newRightHalfPosition, move, boxPositions);

            const newBoxPositions = {};
            for (let i of Object.keys(positionsLeft)) {
                newBoxPositions[i] = positionsLeft[i];
            }
            for (let i of Object.keys(positionsRight)) {
                if (!newBoxPositions[i]) {
                    newBoxPositions[i] = [];
                }
                for (let k of positionsRight[i]) {
                    if (!newBoxPositions[i].includes(k)) {
                        newBoxPositions[i].push(k);
                    }
                }
            }

            return newBoxPositions;
        };

        const boxPositions = getBoxPositions(position, move, {});

        const swapBoxPositions = (boxPositions, move) => {
            const isUp = move[0] < 0;

            const sortedKeys = Object.keys(boxPositions).sort((a, b) => (isUp ? a - b : b - a));

            for (let i of sortedKeys) {
                for (let k of boxPositions[i]) {
                    let newI = parseInt(i) + move[0];
                    let newK = parseInt(k) + move[1];

                    map[newI][newK] = map[parseInt(i)][parseInt(k)];
                    map[parseInt(i)][parseInt(k)] = EMPTY_SYMBOL;
                }
            }
        };
        swapBoxPositions(boxPositions, move);
    };

    const moveBox = (position, move) => {
        const isHorizontal = move[1] !== 0;
        return isHorizontal ? moveBoxHorizontal(position, move) : moveBoxVertical(position, move);
    };

    console.time('Part2 time:');
    let position = startPosition;
    for (let move of moves) {
        let newPosition = [position[0] + move[0], position[1] + move[1]];

        if (map[newPosition[0]][newPosition[1]] === WALL_SYMBOL) {
            continue;
        }
        if (
            map[newPosition[0]][newPosition[1]] === BOX_START_SYMBOL ||
            map[newPosition[0]][newPosition[1]] === BOX_END_SYMBOL
        ) {
            if (isBoxMoving(newPosition, move)) {
                moveBox(newPosition, move);
                position = newPosition;
            }
        } else if (map[newPosition[0]][newPosition[1]] === EMPTY_SYMBOL) {
            position = newPosition;
        }
    }

    let sum = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === BOX_START_SYMBOL) {
                sum += i * 100 + j;
            }
        }
    }
    console.timeEnd('Part2 time:');
    console.log('Part2 sum:', sum);
}

function part1() {
    const [mapIn, movesIn] = input.split('\n\n');
    const map = [];
    const START_SYMBOL = '@';
    const WALL_SYMBOL = '#';
    const BOX_SYMBOL = 'O';
    const EMPTY_SYMBOL = '.';

    let startPosition = [];
    for (let line of mapIn.split('\n')) {
        map.push([]);
        for (let char of line) {
            if (char === START_SYMBOL) {
                startPosition = [map.length - 1, map[map.length - 1].length];
            }
            if (char === EMPTY_SYMBOL || char === START_SYMBOL) {
                map[map.length - 1].push(EMPTY_SYMBOL);
            } else {
                map[map.length - 1].push(char);
            }
        }
    }

    const movesLookup = {
        '<': [0, -1],
        '>': [0, 1],
        '^': [-1, 0],
        v: [1, 0],
    };

    const moves = movesIn
        .split('\n')
        .join('')
        .split('')
        .map((move) => {
            return movesLookup[move];
        });

    const isBoxMoving = (position, move) => {
        let newPosition = [position[0] + move[0], position[1] + move[1]];

        while (true) {
            if (map[newPosition[0]][newPosition[1]] === WALL_SYMBOL) {
                return false;
            }
            if (map[newPosition[0]][newPosition[1]] === EMPTY_SYMBOL) {
                return true;
            }
            newPosition = [newPosition[0] + move[0], newPosition[1] + move[1]];
        }
    };

    const moveBox = (position, move) => {
        map[position[0]][position[1]] = EMPTY_SYMBOL;
        let newPosition = [position[0] + move[0], position[1] + move[1]];

        while (map[newPosition[0]][newPosition[1]] !== EMPTY_SYMBOL) {
            newPosition = [newPosition[0] + move[0], newPosition[1] + move[1]];
        }
        map[newPosition[0]][newPosition[1]] = BOX_SYMBOL;
    };

    console.time('Part1 time:');
    let position = startPosition;
    for (let move of moves) {
        let newPosition = [position[0] + move[0], position[1] + move[1]];

        if (map[newPosition[0]][newPosition[1]] === WALL_SYMBOL) {
            continue;
        }

        if (map[newPosition[0]][newPosition[1]] === BOX_SYMBOL) {
            if (isBoxMoving(newPosition, move)) {
                moveBox(newPosition, move);
                position = newPosition;
            }
        }
        if (map[newPosition[0]][newPosition[1]] === EMPTY_SYMBOL) {
            position = newPosition;
        }
    }

    let sum = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === BOX_SYMBOL) {
                sum += i * 100 + j;
            }
        }
    }
    console.timeEnd('Part1 time:');
    console.log('Part1 sum:', sum);
}
