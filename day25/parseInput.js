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

    const keyLocksin = inputRules.split('\n\n');
    const keyLocks = keyLocksin.map((el) => el.split('\n'));

    const keys = [];
    const locks = [];
    for (let i = 0; i < keyLocks.length; i++) {
        let isLock = false;
        if (keyLocks[i][0][0] === '#') {
            isLock = true;
        }

        if (isLock) {
            locks.push([]);
        } else {
            keys.push([]);
        }

        for (let q = 0; q < 5; q++) {
            if (isLock) {
                locks[locks.length - 1].push(-1);
            } else {
                keys[keys.length - 1].push(-1);
            }
        }

        for (let j = 0; j < keyLocks[i].length; j++) {
            for (let k = 0; k < keyLocks[i][j].length; k++) {
                if (isLock) {
                    if (
                        keyLocks[i][j][k] === '.' &&
                        locks[locks.length - 1][k] === -1
                    ) {
                        locks[locks.length - 1][k] = j - 1;
                    }
                } else {
                    if (
                        keyLocks[i][j][k] === '#' &&
                        keys[keys.length - 1][k] === -1
                    ) {
                        keys[keys.length - 1][k] = keyLocks[i].length - j - 1;
                    }
                }
            }
        }
    }

    return [keys, locks];
};
