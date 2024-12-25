import { parseInput } from './parseInput.js';

part1();
part2();

function part2() {
    const [bits, operations] = parseInput('input1.txt');

    const performOperation = (operation) => {
        switch (operation[1]) {
            case 'AND':
                return operation[0] & operation[2];
            case 'OR':
                return operation[0] | operation[2];
            case 'XOR':
                return operation[0] ^ operation[2];
        }
    };

    let str = '';
    for (const op of operations) {
        str += `${op[3]} -> ${op[0]} [label="${op[1]}"];`;
        str += '\n';
        str += `${op[3]} -> ${op[2]} [label="${op[1]}"];`;
        str += '\n';
    }
    console.log(str);

    let curOperIndex = 0;
    while (operations.length > 0) {
        const operation = operations[curOperIndex];
        const [bit1, fun, bit2, resultBit] = operation;

        if (bits[bit1] !== undefined && bits[bit2] !== undefined) {
            bits[resultBit] = performOperation([bits[bit1], fun, bits[bit2]]);
            operations.splice(curOperIndex, 1);
            curOperIndex = 0;
        } else {
            curOperIndex++;
        }
    }

    const res = Object.entries(bits)
        .filter(([key]) => key.startsWith('z'))
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([, value]) => value)
        .reverse()
        .join('');

    console.log(res);
    console.log(parseInt(res, 2));
}

function part1() {
    const [bits, operations] = parseInput('input1.txt');

    const performOperation = (operation) => {
        switch (operation[1]) {
            case 'AND':
                return operation[0] & operation[2];
            case 'OR':
                return operation[0] | operation[2];
            case 'XOR':
                return operation[0] ^ operation[2];
        }
    };

    let curOperIndex = 0;
    while (operations.length > 0) {
        const operation = operations[curOperIndex];
        const [bit1, fun, bit2, resultBit] = operation;

        if (bits[bit1] !== undefined && bits[bit2] !== undefined) {
            bits[resultBit] = performOperation([bits[bit1], fun, bits[bit2]]);
            operations.splice(curOperIndex, 1);
            curOperIndex = 0;
        } else {
            curOperIndex++;
        }
    }

    const res = Object.entries(bits)
        .filter(([key]) => key.startsWith('z'))
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([, value]) => value)
        .reverse()
        .join('');

    console.log(parseInt(res, 2));
}
