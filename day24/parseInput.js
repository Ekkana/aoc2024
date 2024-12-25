import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const parseInput = (fileName) => {
    const inputRules = fs
        .readFileSync(path.join(__dirname, fileName), 'utf8')
        .toString()
        .trim();

    const [bitsStr, operationsStr] = inputRules.split('\n\n');
    const bitsArr = bitsStr.split('\n').map((row) => {
        const [bit, value] = row.split(': ');
        return [bit, Number(value)];
    });

    const bits = Object.fromEntries(bitsArr);

    //ntg XOR fgs -> mjb
    const operations = operationsStr.split('\n').map((row) => {
        const [operation, resultBit] = row.split(' -> ');
        const [bit1, fun, bit2] = operation.split(' ');

        return [bit1, fun, bit2, resultBit];
    });
    return [bits, operations];
};
