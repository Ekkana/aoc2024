import input from './input.js';

const formattedInput = input.split('\n').map((line) => line.split(' ').map((num) => parseInt(num)));

let validLines1 = 0;

// Part 1
formattedInput.forEach((line) => {
    const isIncreasing = line[1] < line[0];
    let isSafe = true;

    for (let i = 1; i < line.length; i++) {
        isSafe = true;

        if (isIncreasing !== line[i] < line[i - 1]) {
            isSafe = false;
            break;
        }

        if (Math.abs(line[i] - line[i - 1]) < 1 || Math.abs(line[i] - line[i - 1]) > 3) {
            isSafe = false;
            break;
        }
    }
    if (isSafe) validLines1++;
});

let validLines3 = 0;

// Part 2
formattedInput.forEach((line) => {
    let isSafe = true;
    let hasJumped = false;

    const isCommonlyAscending = line.reduce(
        (acc, curr, i) => {
            if (i === 0) return acc;
            if (curr > line[i - 1]) {
                acc.asc++;
            } else {
                acc.desc++;
            }
            return acc;
        },
        { asc: 0, desc: 0 },
    );
    let isIncreasing = isCommonlyAscending.asc < isCommonlyAscending.desc;

    console.log(JSON.stringify(line));
    for (let i = 0; i < line.length - 1; i++) {
        isSafe = true;

        if (
            isIncreasing !== line[i] > line[i + 1] ||
            Math.abs(line[i] - line[i + 1]) < 1 ||
            Math.abs(line[i] - line[i + 1]) > 3
        ) {
            if (hasJumped === true) {
                console.log('Already Jumped');
                isSafe = false;
                break;
            }

            // if we are at the start:
            if (i === 0) {
                if (
                    isIncreasing !== line[i + 1] > line[i + 2] ||
                    Math.abs(line[i + 1] - line[i + 2]) < 1 ||
                    Math.abs(line[i + 1] - line[i + 2]) > 3
                ) {
                    if (
                        isIncreasing !== line[i] > line[i + 2] ||
                        Math.abs(line[i] - line[i + 2]) < 1 ||
                        Math.abs(line[i] - line[i + 2]) > 3
                    ) {
                        console.log('Start Over Abort');
                        isSafe = false;
                        break;
                    } else {
                        console.log('Start Jumping Over');
                        hasJumped = true;
                        i += 1;
                        continue;
                    }
                } else {
                    console.log('Start Jumping');
                    hasJumped = true;
                    continue;
                }
            }

            // if we are at the end:
            if (i === line.length - 2) {
                console.log('End Jumping');
                hasJumped = true;
                continue;
            }

            // if we are in the middle:
            if (i > 0) {
                if (
                    isIncreasing !== line[i - 1] > line[i + 1] ||
                    Math.abs(line[i - 1] - line[i + 1]) < 1 ||
                    Math.abs(line[i - 1] - line[i + 1]) > 3
                ) {
                    if (
                        isIncreasing !== line[i] > line[i + 2] ||
                        Math.abs(line[i] - line[i + 2]) < 1 ||
                        Math.abs(line[i] - line[i + 2]) > 3
                    ) {
                        console.log('Middle Over Abort');
                        isSafe = false;
                        break;
                    } else {
                        console.log('Middle Jumping Over');
                        hasJumped = true;
                        i += 1;
                        continue;
                    }
                } else {
                    if (
                        isIncreasing !== line[i] > line[i + 2] ||
                        Math.abs(line[i] - line[i + 2]) < 1 ||
                        Math.abs(line[i] - line[i + 2]) > 3
                    ) {
                        console.log(line[i - 1], line[i + 1]);
                        console.log('Middle Jumping');
                        hasJumped = true;
                        continue;
                    } else {
                        console.log('Middle Jumping Over');
                        hasJumped = true;
                        i += 1;
                        continue;
                    }
                }
            }
        }
    }

    //console.log(
    //    `${isSafe ? `x :` : "  :"} ${JSON.stringify(line).split(",").join(" ").slice(1, -1)}`,
    //);
    //
    console.log(isSafe);
    if (isSafe) validLines3++;
});

console.log(validLines3);
