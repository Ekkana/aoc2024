const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8').toString().trim();

const tasks = input.split('\n\n');
const separatedTasks = tasks.map((task) => task.split('\n'));
const numbers = separatedTasks.map((task) => {
    let x1 = parseInt(task[0].split(' ')[2].replace(/^\D+/g, ''));
    let y1 = parseInt(task[0].split(' ')[3].replace(/^\D+/g, ''));

    let x2 = parseInt(task[1].split(' ')[2].replace(/^\D+/g, ''));
    let y2 = parseInt(task[1].split(' ')[3].replace(/^\D+/g, ''));

    let result1 = parseInt(task[2].split(' ')[1].replace(/^\D+/g, ''));
    let result2 = parseInt(task[2].split(' ')[2].replace(/^\D+/g, ''));

    return [x1, y1, x2, y2, 10000000000000 + result1, 10000000000000 + result2];
});

const part1 = () => {
    const cramersRule2x2 = (a11, a12, b1, a21, a22, b2) => {
        const detA = a11 * a22 - a12 * a21;
        const EPSILON = 1e-9;

        if (detA === EPSILON) {
            throw new Error('Determinant is 0');
        }

        const detX = b1 * a22 - b2 * a12;
        const detY = a11 * b2 - a21 * b1;

        const x = detX / detA;
        const y = detY / detA;

        return [x, y];
    };

    const results = [];
    for (let element of numbers) {
        try {
            const [a, b] = cramersRule2x2(
                element[0],
                element[2],
                element[4],
                element[1],
                element[3],
                element[5],
            );

            if (Number.isInteger(a) && Number.isInteger(b)) {
                results.push([a, b]);
            }
        } catch (_err) {}
    }

    let sum = 0;
    for (let result of results) {
        sum += result[0] * 3 + result[1] * 1;
    }
    console.log(sum);
};

part1();
