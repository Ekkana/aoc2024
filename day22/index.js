import { parseInput } from './parseInput.js';

const input = parseInput('input1.txt');

const PRUNE_MOD = 16777216;

part1();
console.time('Part2');
part2();
console.timeEnd('Part2');

function part2() {
    const prune = (value) => value % PRUNE_MOD;
    const mix = (value1, value2) => (value1 ^ value2) >>> 0;

    const generateSecretNumber = (secret) => {
        const step1 = prune(mix(secret, secret << 6));
        const step2 = prune(mix(step1, step1 >> 5));
        const step3 = prune(mix(step2, step2 << 11));

        return step3;
    };

    const runs = 2000;
    const results = [];
    for (let i = 0; i < input.length; i++) {
        results.push([input[0]]);
        const number = input[i];
        let secret = number;
        for (let j = 0; j < runs; j++) {
            secret = generateSecretNumber(secret);
            results[i].push(secret);
        }
    }

    const sumDistance = [];
    for (let i = 0; i < results.length; i++) {
        sumDistance.push([]);

        for (let j = 0; j < results[i].length; j++) {
            const leftOver = results[i][j] % 10;
            sumDistance[i].push([leftOver, j == 0 ? 0 : leftOver - sumDistance[i][j - 1][0]]);
        }
    }

    const getWindows = (array, size) => {
        const windows = [];

        for (let i = 0; i < array.length - size + 1; i++) {
            windows.push(array.slice(i, i + size));
        }

        return windows;
    };

    const windows = [];
    for (let i = 0; i < sumDistance.length; i++) {
        windows.push(getWindows(sumDistance[i], 4));
    }

    const inclusions = [];

    for (let i = 0; i < windows.length; i++) {
        inclusions.push(new Map());

        for (let j = 0; j < windows[i].length; j++) {
            const key = windows[i][j].map((el) => el[1]).join('|');
            if (!inclusions[i].has(key)) {
                inclusions[i].set(key, windows[i][j][windows[i][j].length - 1][0]);
            }
        }
    }

    const totals = {};
    for (const map of inclusions) {
        for (const [key, value] of map) {
            if (!totals[key]) {
                totals[key] = value;
            } else {
                totals[key] = totals[key] + value;
            }
        }
    }

    const x = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    console.log(x[0]);
}

function part1() {
    const prune = (value) => value % PRUNE_MOD;
    const mix = (value1, value2) => (value1 ^ value2) >>> 0;

    const generateSecretNumber = (secret) => {
        const step1 = prune(mix(secret, secret << 6));
        const step2 = prune(mix(step1, step1 >> 5));
        const step3 = prune(mix(step2, step2 << 11));

        return step3;
    };

    const runs = 2000;
    const results = [];
    for (const number of input) {
        let secret = number;
        for (let i = 0; i < runs; i++) {
            secret = generateSecretNumber(secret);
        }
        results.push(secret);
    }

    console.log(results.reduce((acc, curr) => acc + curr, 0));
}
