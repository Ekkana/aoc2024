const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8').toString().trim();

const splitLines = input.split('\n');
const arr = splitLines.map((line) => line.split(''));

console.log(arr);

const part2 = (arr) => {
    const moveLookup = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    const advancedMoveLookup = {
        left: [0, -1],
        right: [0, 1],
        up: [-1, 0],
        down: [1, 0],
    };

    const diagonalMoveLookup = {
        leftTop: [-1, -1],
        rightTop: [-1, 1],
        leftBottom: [1, -1],
        rightBottom: [1, 1],
    };

    const mutations = {
        leftTop: {
            right: 'left',
            down: 'up',
        },
        rightTop: {
            left: 'right',
            down: 'up',
        },
        leftBottom: {
            right: 'left',
            up: 'down',
        },
        rightBottom: {
            left: 'right',
            up: 'down',
        },
    };

    const steps = {
        leftTop: [
            [0, -1],
            [-1, 0],
        ],
        rightTop: [
            [0, 1],
            [-1, 0],
        ],
        leftBottom: [
            [0, -1],
            [1, 0],
        ],
        rightBottom: [
            [0, 1],
            [1, 0],
        ],
    };

    const isDiagonalReal = (direction, i, j, currentItem) => {
        for (let [iOff, jOff] of steps[direction]) {
            const newI = i + iOff;
            const newJ = j + jOff;
            if (arr[newI][newJ] === currentItem) {
                console.log('Diagonal NOT real', direction, i, j, currentItem);
                return false;
            }
        }
        console.log('Diagonal real', direction, i, j, currentItem);
        return true;
    };

    const generateVisited = (arr) => {
        const visited = [];
        for (let i = 0; i < arr.length; i++) {
            visited.push([]);
            for (let j = 0; j < arr[i].length; j++) {
                visited[i].push(false);
            }
        }
        return visited;
    };

    const visited = generateVisited(arr);

    const getAmountOfNewWalls = (arr, i, j, currentItem, wallPositions, localVisited) => {
        let walls = wallPositions.length;

        const verticalOffsets = [advancedMoveLookup.up, advancedMoveLookup.down];
        const horizontalOffsets = [advancedMoveLookup.left, advancedMoveLookup.right];

        const wallsInVertical = new Set();
        for (let [iOff, jOff] of verticalOffsets) {
            const newI = i + iOff;
            const newJ = j + jOff;

            if (visited[newI] && visited[newI][newJ]) {
                if (visited[newI][newJ][0] === currentItem) {
                    for (let singleWall of visited[newI][newJ][1]) {
                        wallsInVertical.add(singleWall);
                    }
                }
            }
        }

        const wallsInHorizontal = new Set();
        for (let [iOff, jOff] of horizontalOffsets) {
            const newI = i + iOff;
            const newJ = j + jOff;

            if (visited[newI] && visited[newI][newJ]) {
                if (visited[newI][newJ][0] === currentItem) {
                    for (let singleWall of visited[newI][newJ][1]) {
                        wallsInHorizontal.add(singleWall);
                    }
                }
            }
        }

        const wallsInDiagonal = new Set();

        for (let [move, offsets] of Object.entries(diagonalMoveLookup)) {
            const newI = i + offsets[0];
            const newJ = j + offsets[1];

            if (
                localVisited[newI] &&
                localVisited[newI][newJ] &&
                localVisited[newI][newJ][0] === currentItem &&
                isDiagonalReal(move, i, j, currentItem)
            ) {
                for (let singleWall of localVisited[newI][newJ][1]) {
                    if (mutations[move][singleWall]) {
                        console.log('We should check', mutations[move]);
                        console.log('it has following walls', localVisited[newI][newJ][1]);
                        console.log(
                            'At position',
                            i + 1,
                            j + 1,
                            ' found diagonal at ',
                            newI + 1,
                            newJ + 1,
                        );
                        console.log(
                            'It has a wall at the ',
                            singleWall,
                            ', so we add a ',
                            mutations[move][singleWall],
                            'wall',
                        );
                        wallsInDiagonal.add(mutations[move][singleWall]);
                        //continue;
                    }
                }
            }
        }
        //console.log("wallsInVertical", wallsInVertical);
        //console.log("wallsInHorizontal", wallsInHorizontal);
        //console.log("wallsInDiagonal", wallsInDiagonal);

        const allWalls = new Set([...wallsInVertical, ...wallsInHorizontal, ...wallsInDiagonal]);
        console.log('allWalls', allWalls);
        console.log('potential wallPositions', wallPositions);
        for (let wall of wallPositions) {
            if (allWalls.has(wall)) {
                walls--;
            }
        }
        console.log('walls amount', walls);

        return walls;
    };

    const getWallPositions = (arr, i, j, currentItem) => {
        let walls = [];

        for ([direction, offsets] of Object.entries(advancedMoveLookup)) {
            const newI = i + offsets[0];
            const newJ = j + offsets[1];

            if (!arr[newI] || !arr[newI][newJ] || arr[newI][newJ] !== currentItem) {
                walls.push(direction);
            }
        }
        return walls;
    };

    const getAjustmentBug = (i, j, localVisited) => {
        // if there are adjustent elements and both in memory, with same direction, decrease the wall count
        let bugCount = 0;
        const verticalOffsets = [advancedMoveLookup.up, advancedMoveLookup.down];
        const horizontalOffsets = [advancedMoveLookup.left, advancedMoveLookup.right];

        const verticalItemPositions = verticalOffsets.map(([iOff, jOff]) => [i + iOff, j + jOff]);

        if (
            localVisited[verticalItemPositions[0][0]] &&
            localVisited[verticalItemPositions[0][0]][verticalItemPositions[0][1]] &&
            localVisited[verticalItemPositions[1][0]] &&
            localVisited[verticalItemPositions[1][0]][verticalItemPositions[1][1]]
        ) {
            // check if they both have left or both have right
            if (
                (localVisited[verticalItemPositions[0][0]][verticalItemPositions[0][1]][1].includes(
                    'left',
                ) &&
                    localVisited[verticalItemPositions[1][0]][
                        verticalItemPositions[1][1]
                    ][1].includes('left')) ||
                (localVisited[verticalItemPositions[0][0]][verticalItemPositions[0][1]][1].includes(
                    'right',
                ) &&
                    localVisited[verticalItemPositions[1][0]][
                        verticalItemPositions[1][1]
                    ][1].includes('right'))
            ) {
                bugCount++;
            }
            //if (
            //  localVisited[verticalItemPositions[0][0]][
            //    verticalItemPositions[0][1]
            //  ][1].includes("right") &&
            //  localVisited[verticalItemPositions[1][0]][
            //    verticalItemPositions[1][1]
            //  ][1].includes("right")
            //) {
            //  bugCount++;
            //}
        }

        const horizontalItemPositions = horizontalOffsets.map(([iOff, jOff]) => [
            i + iOff,
            j + jOff,
        ]);

        if (
            localVisited[horizontalItemPositions[0][0]] &&
            localVisited[horizontalItemPositions[0][0]][horizontalItemPositions[0][1]] &&
            localVisited[horizontalItemPositions[1][0]] &&
            localVisited[horizontalItemPositions[1][0]][horizontalItemPositions[1][1]]
        ) {
            // check if they both have up or both have down
            if (
                (localVisited[horizontalItemPositions[0][0]][
                    horizontalItemPositions[0][1]
                ][1].includes('up') &&
                    localVisited[horizontalItemPositions[1][0]][
                        horizontalItemPositions[1][0]
                    ][1].includes('up')) ||
                (localVisited[horizontalItemPositions[0][0]][
                    horizontalItemPositions[0][1]
                ][1].includes('down') &&
                    localVisited[horizontalItemPositions[1][0]][
                        horizontalItemPositions[1][0]
                    ][1].includes('down'))
            ) {
                bugCount++;
            }
            //if (
            //  localVisited[horizontalItemPositions[0][0]][
            //    horizontalItemPositions[0][1]
            //  ][1].includes("down") &&
            //  localVisited[horizontalItemPositions[1][0]][
            //    horizontalItemPositions[1][0]
            //  ][1].includes("down")
            //) {
            //  bugCount++;
            //}
        }

        return bugCount;
    };

    // get amount of all elements that are the same and connected to each other
    const getAmount = (arr, i, j, currentTotal, currentItem, currentTotalWalls, localVisited) => {
        if (i < 0 || i >= arr.length || j < 0 || j >= arr[i].length) {
            return [currentTotal, currentTotalWalls];
        }
        if (visited[i][j]) {
            return [currentTotal, currentTotalWalls];
        }
        if (arr[i][j] !== currentItem) {
            return [currentTotal, currentTotalWalls];
        }

        console.log('adding', i, j, arr[i][j]);
        const wallPositions = getWallPositions(arr, i, j, currentItem);
        let addedWalls = getAmountOfNewWalls(arr, i, j, currentItem, wallPositions, localVisited);
        console.log('wallPositions', wallPositions);
        console.log('walls', addedWalls);

        //addedWalls -= getAjustmentBug(i, j, localVisited);

        visited[i][j] = [currentItem, wallPositions];
        localVisited[i][j] = [currentItem, wallPositions];
        console.log('visited', visited[i][j]);

        let sum = 1;

        for (let [iOff, jOff] of moveLookup) {
            const newI = i + iOff;
            const newJ = j + jOff;
            const [newSum, newWalls] = getAmount(
                arr,
                newI,
                newJ,
                currentTotal,
                currentItem,
                currentTotalWalls,
                localVisited,
            );
            sum += newSum;
            addedWalls += newWalls;
        }

        return [sum, addedWalls];
    };

    let totalPrice = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!visited[i][j]) {
                const localVisited = generateVisited(arr);
                const [sum, walls] = getAmount(arr, i, j, 0, arr[i][j], 0, localVisited);
                console.log('Length of ', arr[i][j], ' is ', sum, ' with ', walls, ' walls');
                totalPrice += sum * walls;
            }
        }
    }
    console.log('Total price is ', totalPrice);
};

const part1 = (arr) => {
    const moveLookup = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    const visited = [];

    for (let i = 0; i < arr.length; i++) {
        visited.push([]);
        for (let j = 0; j < arr[i].length; j++) {
            visited[i].push(false);
        }
    }

    const getAmountOfWalls = (arr, i, j, currentItem) => {
        let walls = 0;
        for ([iOff, jOff] of moveLookup) {
            const newI = i + iOff;
            const newJ = j + jOff;

            if (!arr[newI] || !arr[newI][newJ]) {
                walls++;
            } else if (arr[newI][newJ] !== currentItem) {
                walls++;
            }
        }
        return walls;
    };
    // get amount of all elements that are the same and connected to each other
    const getAmount = (arr, i, j, currentTotal, currentItem, currentTotalWalls) => {
        if (i < 0 || i >= arr.length || j < 0 || j >= arr[i].length) {
            return [currentTotal, currentTotalWalls];
        }
        if (visited[i][j]) {
            return [currentTotal, currentTotalWalls];
        }
        if (arr[i][j] !== currentItem) {
            return [currentTotal, currentTotalWalls];
        }

        let addedWalls = getAmountOfWalls(arr, i, j, currentItem);
        visited[i][j] = true;

        let sum = 1;

        for (let [iOff, jOff] of moveLookup) {
            const newI = i + iOff;
            const newJ = j + jOff;
            const [newSum, newWalls] = getAmount(
                arr,
                newI,
                newJ,
                currentTotal,
                currentItem,
                currentTotalWalls,
            );
            sum += newSum;
            addedWalls += newWalls;
        }

        return [sum, addedWalls];
    };

    let totalPrice = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!visited[i][j]) {
                const [sum, walls] = getAmount(arr, i, j, 0, arr[i][j], 0);
                totalPrice += sum * walls;
            }
        }
    }
    console.log('Total price is ', totalPrice);
};

part1(arr);
part2(arr);
