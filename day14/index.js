const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8').toString().trim();

const robots = input.split('\n');
const numbers = robots.map((robot) => {
    let [x, y] = robot.split(' ')[0].split('=')[1].split(',');

    let [offsetX, offsetY] = robot.split(' ')[1].split('=')[1].split(',');

    return {
        x: parseInt(y),
        y: parseInt(x),
        offsetX: parseInt(offsetY),
        offsetY: parseInt(offsetX),
    };
});

const part2 = (steps, mapSize) => {
    const newPositions = [];
    for (let i = 0; i < mapSize.y; i++) {
        newPositions[i] = [];
        for (let j = 0; j < mapSize.x; j++) {
            newPositions[i][j] = 0;
        }
    }

    const getNewPosition = (number, steps, mapSize) => {
        const xOff = (number.x + steps * number.offsetX) % mapSize.y;
        const yOff = (number.y + steps * number.offsetY) % mapSize.x;

        let newX;

        if (xOff < 0) {
            newX = mapSize.y + xOff;
        } else {
            newX = xOff;
        }

        let newY;
        if (yOff < 0) {
            newY = mapSize.x + yOff;
        } else {
            newY = yOff;
        }

        return [newX, newY];
    };

    for (number of numbers) {
        const [x, y] = getNewPosition(number, steps, mapSize);

        if (!newPositions[x][y]) {
            newPositions[x][y] = 1;
        } else {
            newPositions[x][y]++;
        }
    }

    let outputStr = '';
    for (let i = 0; i < newPositions.length; i++) {
        const line = [];
        for (let j = 0; j < newPositions[i].length; j++) {
            if (newPositions[i][j]) {
                line.push(newPositions[i][j]);
            } else {
                line.push('.');
            }
        }
        outputStr += line.join('') + '\n';
    }
    return outputStr;
};

const part1 = (steps, mapSize) => {
    const newPositions = [];
    for (let i = 0; i < mapSize.y; i++) {
        newPositions[i] = [];
        for (let j = 0; j < mapSize.x; j++) {
            newPositions[i][j] = 0;
        }
    }

    const getNewPosition = (number, steps, mapSize) => {
        const xOff = (number.x + steps * number.offsetX) % mapSize.y;
        const yOff = (number.y + steps * number.offsetY) % mapSize.x;

        let newX;

        if (xOff < 0) {
            newX = mapSize.y + xOff;
        } else {
            newX = xOff;
        }

        let newY;
        if (yOff < 0) {
            newY = mapSize.x + yOff;
        } else {
            newY = yOff;
        }

        return [newX, newY];
    };

    for (number of numbers) {
        const [x, y] = getNewPosition(number, steps, mapSize);

        if (!newPositions[x][y]) {
            newPositions[x][y] = 1;
        } else {
            newPositions[x][y]++;
        }
    }

    for (let i = 0; i < newPositions.length; i++) {
        const line = [];
        for (let j = 0; j < newPositions[i].length; j++) {
            if (newPositions[i][j]) {
                line.push(newPositions[i][j]);
            } else {
                line.push('.');
            }
        }
    }

    const middlePoint = Math.floor(newPositions.length / 2);
    const middlePoint2 = Math.floor(newPositions[0].length / 2);

    let sum1 = 0;
    for (let i = 0; i < middlePoint; i++) {
        for (let j = 0; j < middlePoint2; j++) {
            sum1 += newPositions[i][j];
        }
    }

    let sum2 = 0;
    for (let i = middlePoint + 1; i < newPositions.length; i++) {
        for (let j = 0; j < middlePoint2; j++) {
            sum2 += newPositions[i][j];
        }
    }

    let sum3 = 0;
    for (let i = 0; i < middlePoint; i++) {
        for (let j = middlePoint2 + 1; j < newPositions[0].length; j++) {
            sum3 += newPositions[i][j];
        }
    }

    let sum4 = 0;
    for (let i = middlePoint + 1; i < newPositions.length; i++) {
        for (let j = middlePoint2 + 1; j < newPositions[0].length; j++) {
            sum4 += newPositions[i][j];
        }
    }

    console.log(sum1 * sum2 * sum3 * sum4);
};

//part1(100, { x: 11, y: 7 });
//part1(100, { x: 101, y: 103 });
//part2(100, { x: 101, y: 103 });

let str = '';
for (let i = 10000; i < 20000; i++) {
    str += i + '\n';
    const data = part2(i, { x: 101, y: 103 });
    str += data;
}

fs.writeFile('output3.txt', str, (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File written successfully.');
    }
});
