import { parseInput } from './parseInput.js';

const [keys, locks] = parseInput('input1.txt');

part1();
function part1() {
    let amount = 0;
    for (const lock of locks) {
        for (const key of keys) {
            let isMatch = true;
            for (let i = 0; i < lock.length; i++) {
                if (5 - lock[i] < key[i]) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                amount++;
            }
        }
    }

    console.log('part1', amount);
}
