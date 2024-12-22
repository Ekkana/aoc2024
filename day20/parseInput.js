import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const parseInput = (fileName) => {
    const inputRules = fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString().trim();

    const rows = inputRules.split('\n');
    const map = rows.map((row) => row.split(''));
    const startS = 'S';
    const endS = 'E';
    let start = [];
    let end = [];

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === startS) {
                start = [i, j];
                map[i][j] = '.';
            }
            if (map[i][j] === endS) {
                end = [i, j];
                map[i][j] = '.';
            }
        }
    }

    return [start, end, map];
};
