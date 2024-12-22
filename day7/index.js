const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8').toString().trim();

const splitLines = input.split('\n');
const arr = splitLines.map((line) => [
    parseInt(line.split(': ')[0]),
    line
        .split(': ')[1]
        .split(' ')
        .map((el) => parseInt(el)),
]);

const part1 = () => {
    const output = [];
    const operations = ['+', '*'];
    for (let i = 0; i < arr.length; i++) {
        const result = arr[i][0];
        const items = arr[i][1];

        const variants = Math.pow(operations.length, items.length - 1);

        let resultStr = '';
        for (let j = 0; j < variants; j++) {
            let current = j;
            resultStr += items[0];

            for (let k = 1; k < items.length; k++) {
                const op = operations[current % operations.length];
                const value = items[k];
                resultStr = eval(`${resultStr}${op}${value}`);
                //current = Math.floor(current / operations.length);
                current++;
            }

            if (resultStr === result) {
                output.push(result);
                break;
            } else {
                resultStr = '';
            }
        }
        resultStr = '';
    }

    console.log(output.reduce((acc, curr) => acc + curr, 0));
};

console.time('part1');
part1();
console.timeEnd('part1');

const part2 = () => {
    const output = [];
    const operations = ['+', '*', '|'];
    for (let i = 0; i < arr.length; i++) {
        const result = arr[i][0];
        const items = arr[i][1];

        const variants = Math.pow(operations.length, items.length - 1);
        let resultStr = '';

        for (let j = 0; j < variants; j++) {
            let current = j;
            resultStr += items[0];

            for (let k = 1; k < items.length; k++) {
                const op = operations[current % operations.length];
                const value = items[k];

                if (op === '|') {
                    resultStr = `${resultStr}${value}`;
                } else {
                    resultStr = eval(`${resultStr}${op}${value}`);
                }

                current = Math.floor(current / operations.length);
                if (parseInt(resultStr) > result) {
                    break;
                }
            }

            if (resultStr == result) {
                output.push(result);
                break;
            }
            resultStr = '';
        }
        resultStr = '';
    }
    console.log(output.reduce((acc, curr) => acc + curr, 0));
};

console.time('part2');
part2();
console.timeEnd('part2');

const part3 = () => {
    const output = [];

    const findAnswer = (arr, curIndex, prevValue, result, operationFunc) => {
        const curVal = operationFunc(prevValue, arr[curIndex]);
        if (curVal > result) {
            return false;
        }

        if (arr.length === curIndex) {
            return prevValue === result;
        }

        return (
            findAnswer(arr, curIndex + 1, curVal, result, sum) ||
            findAnswer(arr, curIndex + 1, curVal, result, mul) ||
            findAnswer(arr, curIndex + 1, curVal, result, concat)
        );
    };

    const sum = (a, b) => a + b;
    const mul = (a, b) => a * b;
    const concat = (a, b) => parseInt(`${a}${b}`);

    for (let i = 0; i < arr.length; i++) {
        const result = arr[i][0];
        const items = arr[i][1];

        if (findAnswer(items, 0, 0, result, sum)) {
            output.push(result);
        }
    }

    console.log(output.reduce((acc, curr) => acc + curr, 0));
};
console.time('part3');
part3();
console.timeEnd('part3');

const part4 = () => {
    const output = [];

    const findAnswer = (arr, curIndex, prevValue, operationFunc) => {
        if (0 === curIndex) {
            return prevValue === arr[0];
        }
        const curVal = operationFunc(prevValue, arr[curIndex]);

        if (curVal == 0) {
            //console.log("Not valid", curVal, prevValue, arr[curIndex]);
            return false;
        }

        return (
            findAnswer(arr, curIndex - 1, curVal, split) ||
            findAnswer(arr, curIndex - 1, curVal, div) ||
            findAnswer(arr, curIndex - 1, curVal, sub)
        );
    };

    const sub = (a, b) => {
        const val = a - b;
        return val > 0 ? val : 0;
    };
    const div = (a, b) => {
        const val = a / b;
        return Math.floor(val) == val ? val : 0;
    };
    const split = (a, b) => {
        const aStr = a.toString();
        const bStr = b.toString();
        const isValid = aStr.substring(aStr.length - bStr.length) === bStr;

        return isValid ? parseInt(aStr.substring(0, aStr.length - bStr.length)) : 0;
    };

    for (let i = 0; i < arr.length; i++) {
        const result = arr[i][0];
        const items = arr[i][1];
        if (
            findAnswer(items, items.length - 1, result, split) ||
            findAnswer(items, items.length - 1, result, div) ||
            findAnswer(items, items.length - 1, result, sub)
        ) {
            output.push(result);
        }
    }

    console.log(output.reduce((acc, curr) => acc + curr, 0));
};
console.time('part4');
part4();
console.timeEnd('part4');
